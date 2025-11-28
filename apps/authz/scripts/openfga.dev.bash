#!/bin/bash
set -e

echo "Waiting for OpenFGA..."
until curl -s http://openfga:8080/healthz > /dev/null; do
  sleep 1
done
echo "OpenFGA is up."

EXISTING_STORE_ID=$(curl -s http://openfga:8080/stores \
  | jq -r '.stores[] | select(.name=="auth-store") | .id')

STORE_ID=$EXISTING_STORE_ID

if [ -z "$STORE_ID" ]; then
  # store not found
  echo "Store with name \"auth-store\" was not found. Creating it..."

  STORE_ID=$(curl -s -X POST http://openfga:8080/stores \
    -H "Content-Type: application/json" \
    -d '{"name":"auth-store"}' \
    | jq -r '.id')
fi

echo "Store id is: $STORE_ID"

CURRENT_MODEL_ID=$(curl -s \
  http://openfga:8080/stores/$STORE_ID/authorization-models \
  | jq -r '.authorization_models[-1].id')

MODEL_ID=$CURRENT_MODEL_ID

MY_MODEL_HASH=$(sha256sum apps/authz/scripts/models/auth.model.json | awk '{print $1}')
CURRENT_MODEL_HASH=""

if [[ -z "$MODEL_ID" || "$MODEL_ID" == "null" ]]; then
  # model not found
  echo "No model found. Uploading new model..."

  MODEL_ID=$(curl -s -X POST \
    http://openfga:8080/stores/$STORE_ID/authorization-models \
    -H "Content-Type: application/json" \
    --data @apps/authz/scripts/models/auth.model.json \
    | jq -r '.authorization_model_id')

else
  # Model found
  echo "Model was already found in the store"
  
  # Get the current model hash for comparison
  CURRENT_MODEL_HASH=$(curl -s \
    http://openfga:8080/stores/$STORE_ID/authorization-models/$CURRENT_MODEL_ID \
    | sha256sum | awk '{print $1}')
  
  if [ "$CURRENT_MODEL_HASH" = "$MY_MODEL_HASH" ]; then
    echo "Model is already up to date. Skipping upload."

  else
    echo "New model state was found, Updating authorization model state..."

    MODEL_ID=$(curl -s -X POST \
      http://openfga:8080/stores/$STORE_ID/authorization-models \
      -H "Content-Type: application/json" \
      --data @apps/authz/scripts/models/auth.model.json \
      | jq -r '.authorization_model_id')
  fi
fi

echo "Model id is: $MODEL_ID"

echo "{\"storeId\":\"$STORE_ID\",\"modelId\":\"$MODEL_ID\"}" \ > openfga.json

echo "Bootstrap complete."
