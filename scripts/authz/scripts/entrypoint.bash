#!/bin/bash
set -e

echo "[BOOTSTRAP] Waiting for OpenFGA..."
until curl -s http://openfga:8080/healthz > /dev/null; do
  sleep 1
done
echo "[BOOTSTRAP] OpenFGA ready."

ls

./scripts/openfga.bash

STORE_ID=$(jq -r '.storeId' openfga.json)
MODEL_ID=$(jq -r '.modelId' openfga.json)

export FGA_STORE_ID=$STORE_ID
export FGA_MODEL_ID=$MODEL_ID

echo "[BOOTSTRAP] storeId=$STORE_ID"
echo "[BOOTSTRAP] modelId=$MODEL_ID"

echo "[ENTRYPOINT] Starting service..."
exec "$@"
