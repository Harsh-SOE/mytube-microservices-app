'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">books documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>

                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AggregatorCacheModule.html" data-type="entity-link" >AggregatorCacheModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AggregatorCacheModule-1d981dfa6f7c2b9c491ec833f63fbf9c47213c51d4f3a04bf50920c7913c1e67ca4192747e47eca8b92fd57b1aefa06440183174e5883cc8f20dd4b4cb1c4166"' : 'data-bs-target="#xs-injectables-links-module-AggregatorCacheModule-1d981dfa6f7c2b9c491ec833f63fbf9c47213c51d4f3a04bf50920c7913c1e67ca4192747e47eca8b92fd57b1aefa06440183174e5883cc8f20dd4b4cb1c4166"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AggregatorCacheModule-1d981dfa6f7c2b9c491ec833f63fbf9c47213c51d4f3a04bf50920c7913c1e67ca4192747e47eca8b92fd57b1aefa06440183174e5883cc8f20dd4b4cb1c4166"' :
                                        'id="xs-injectables-links-module-AggregatorCacheModule-1d981dfa6f7c2b9c491ec833f63fbf9c47213c51d4f3a04bf50920c7913c1e67ca4192747e47eca8b92fd57b1aefa06440183174e5883cc8f20dd4b4cb1c4166"' }>
                                        <li class="link">
                                            <a href="injectables/AggregatorCacheService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AggregatorCacheService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LikeAggregateFactory.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LikeAggregateFactory</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LikePersistanceACL.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LikePersistanceACL</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LikeRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LikeRepository</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AggregatorModule.html" data-type="entity-link" >AggregatorModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppConfigModule.html" data-type="entity-link" >AppConfigModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppConfigModule-6bb64e49442c8bb7dcac8330b1bbfdd66ac559e2effa5cd52fae86f239e4259ea47335669cc13d91783d8004d84c843ef48c1cc374e7519e2a857ed4017527a4"' : 'data-bs-target="#xs-injectables-links-module-AppConfigModule-6bb64e49442c8bb7dcac8330b1bbfdd66ac559e2effa5cd52fae86f239e4259ea47335669cc13d91783d8004d84c843ef48c1cc374e7519e2a857ed4017527a4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppConfigModule-6bb64e49442c8bb7dcac8330b1bbfdd66ac559e2effa5cd52fae86f239e4259ea47335669cc13d91783d8004d84c843ef48c1cc374e7519e2a857ed4017527a4"' :
                                        'id="xs-injectables-links-module-AppConfigModule-6bb64e49442c8bb7dcac8330b1bbfdd66ac559e2effa5cd52fae86f239e4259ea47335669cc13d91783d8004d84c843ef48c1cc374e7519e2a857ed4017527a4"' }>
                                        <li class="link">
                                            <a href="injectables/AppConfigService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppConfigService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppConfigModule.html" data-type="entity-link" >AppConfigModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppConfigModule-56a821eb6b7caa884487b1a4b479039764654de67df82b16fef52fde3501f1954fb4741931fc9fb9fa1da2bae95b1c422e2b201b985a81ed2eb536ab78a425ae-1"' : 'data-bs-target="#xs-injectables-links-module-AppConfigModule-56a821eb6b7caa884487b1a4b479039764654de67df82b16fef52fde3501f1954fb4741931fc9fb9fa1da2bae95b1c422e2b201b985a81ed2eb536ab78a425ae-1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppConfigModule-56a821eb6b7caa884487b1a4b479039764654de67df82b16fef52fde3501f1954fb4741931fc9fb9fa1da2bae95b1c422e2b201b985a81ed2eb536ab78a425ae-1"' :
                                        'id="xs-injectables-links-module-AppConfigModule-56a821eb6b7caa884487b1a4b479039764654de67df82b16fef52fde3501f1954fb4741931fc9fb9fa1da2bae95b1c422e2b201b985a81ed2eb536ab78a425ae-1"' }>
                                        <li class="link">
                                            <a href="injectables/AppConfigService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppConfigService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppConfigModule.html" data-type="entity-link" >AppConfigModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppConfigModule-8eea40765623b86a68f6dec244f3d1c66bbf8404aba2cf327031adb2dc1cf9380d53195072205d0861440b7d4536397931d8a7a61f448894fad1693f00cca974-2"' : 'data-bs-target="#xs-injectables-links-module-AppConfigModule-8eea40765623b86a68f6dec244f3d1c66bbf8404aba2cf327031adb2dc1cf9380d53195072205d0861440b7d4536397931d8a7a61f448894fad1693f00cca974-2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppConfigModule-8eea40765623b86a68f6dec244f3d1c66bbf8404aba2cf327031adb2dc1cf9380d53195072205d0861440b7d4536397931d8a7a61f448894fad1693f00cca974-2"' :
                                        'id="xs-injectables-links-module-AppConfigModule-8eea40765623b86a68f6dec244f3d1c66bbf8404aba2cf327031adb2dc1cf9380d53195072205d0861440b7d4536397931d8a7a61f448894fad1693f00cca974-2"' }>
                                        <li class="link">
                                            <a href="injectables/AppConfigService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppConfigService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppConfigModule.html" data-type="entity-link" >AppConfigModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppConfigModule-f4fc2c4b11d43187204e1d5c634b73a33fbbfb217aec109a42e4292db5ce5513109b0008a565b312a8bc65f6a5f773b5833c6d7eb6f1d16455583187b63f9644-3"' : 'data-bs-target="#xs-injectables-links-module-AppConfigModule-f4fc2c4b11d43187204e1d5c634b73a33fbbfb217aec109a42e4292db5ce5513109b0008a565b312a8bc65f6a5f773b5833c6d7eb6f1d16455583187b63f9644-3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppConfigModule-f4fc2c4b11d43187204e1d5c634b73a33fbbfb217aec109a42e4292db5ce5513109b0008a565b312a8bc65f6a5f773b5833c6d7eb6f1d16455583187b63f9644-3"' :
                                        'id="xs-injectables-links-module-AppConfigModule-f4fc2c4b11d43187204e1d5c634b73a33fbbfb217aec109a42e4292db5ce5513109b0008a565b312a8bc65f6a5f773b5833c6d7eb6f1d16455583187b63f9644-3"' }>
                                        <li class="link">
                                            <a href="injectables/AppConfigService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppConfigService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppConfigModule.html" data-type="entity-link" >AppConfigModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppConfigModule-da7795ffeec6b9e5455a2ef2719d07478d6418c4fd8aaf9183a88ea49fee99a50c8c88b2c60d1349ac0d995de7c9f934b201b8560266b642c8b0a51ea036cf29-4"' : 'data-bs-target="#xs-injectables-links-module-AppConfigModule-da7795ffeec6b9e5455a2ef2719d07478d6418c4fd8aaf9183a88ea49fee99a50c8c88b2c60d1349ac0d995de7c9f934b201b8560266b642c8b0a51ea036cf29-4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppConfigModule-da7795ffeec6b9e5455a2ef2719d07478d6418c4fd8aaf9183a88ea49fee99a50c8c88b2c60d1349ac0d995de7c9f934b201b8560266b642c8b0a51ea036cf29-4"' :
                                        'id="xs-injectables-links-module-AppConfigModule-da7795ffeec6b9e5455a2ef2719d07478d6418c4fd8aaf9183a88ea49fee99a50c8c88b2c60d1349ac0d995de7c9f934b201b8560266b642c8b0a51ea036cf29-4"' }>
                                        <li class="link">
                                            <a href="injectables/AppConfigService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppConfigService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppConfigModule.html" data-type="entity-link" >AppConfigModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppConfigModule-495fdded84dbd1e18a8c615fcea981d30012a61c28e81e81a57d6593c901993d3cdbe3d1537f34f6c27de844902ec7c3967af0ead0e10baad52ef37266d38527-5"' : 'data-bs-target="#xs-injectables-links-module-AppConfigModule-495fdded84dbd1e18a8c615fcea981d30012a61c28e81e81a57d6593c901993d3cdbe3d1537f34f6c27de844902ec7c3967af0ead0e10baad52ef37266d38527-5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppConfigModule-495fdded84dbd1e18a8c615fcea981d30012a61c28e81e81a57d6593c901993d3cdbe3d1537f34f6c27de844902ec7c3967af0ead0e10baad52ef37266d38527-5"' :
                                        'id="xs-injectables-links-module-AppConfigModule-495fdded84dbd1e18a8c615fcea981d30012a61c28e81e81a57d6593c901993d3cdbe3d1537f34f6c27de844902ec7c3967af0ead0e10baad52ef37266d38527-5"' }>
                                        <li class="link">
                                            <a href="injectables/AppConfigService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppConfigService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppConfigModule.html" data-type="entity-link" >AppConfigModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppConfigModule-95efb6dc8bb4c270d09ba8bc0de806155514fb7900650ac753ee6f83d01f7f3bbb6a6a186521b712ec9824ce41af79423e66cbbcec610b3e65acb33264dcd6ef-6"' : 'data-bs-target="#xs-injectables-links-module-AppConfigModule-95efb6dc8bb4c270d09ba8bc0de806155514fb7900650ac753ee6f83d01f7f3bbb6a6a186521b712ec9824ce41af79423e66cbbcec610b3e65acb33264dcd6ef-6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppConfigModule-95efb6dc8bb4c270d09ba8bc0de806155514fb7900650ac753ee6f83d01f7f3bbb6a6a186521b712ec9824ce41af79423e66cbbcec610b3e65acb33264dcd6ef-6"' :
                                        'id="xs-injectables-links-module-AppConfigModule-95efb6dc8bb4c270d09ba8bc0de806155514fb7900650ac753ee6f83d01f7f3bbb6a6a186521b712ec9824ce41af79423e66cbbcec610b3e65acb33264dcd6ef-6"' }>
                                        <li class="link">
                                            <a href="injectables/AppConfigService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppConfigService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppConfigModule.html" data-type="entity-link" >AppConfigModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppConfigModule-1569b51d98acaddc9cb0106318ca67df9fe3f33148649db6d5968150331cb8fcd40ce147fdf40f5dd609d0385c93d64c79d3de52740610bd86d6cf1c27772c3d-7"' : 'data-bs-target="#xs-injectables-links-module-AppConfigModule-1569b51d98acaddc9cb0106318ca67df9fe3f33148649db6d5968150331cb8fcd40ce147fdf40f5dd609d0385c93d64c79d3de52740610bd86d6cf1c27772c3d-7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppConfigModule-1569b51d98acaddc9cb0106318ca67df9fe3f33148649db6d5968150331cb8fcd40ce147fdf40f5dd609d0385c93d64c79d3de52740610bd86d6cf1c27772c3d-7"' :
                                        'id="xs-injectables-links-module-AppConfigModule-1569b51d98acaddc9cb0106318ca67df9fe3f33148649db6d5968150331cb8fcd40ce147fdf40f5dd609d0385c93d64c79d3de52740610bd86d6cf1c27772c3d-7"' }>
                                        <li class="link">
                                            <a href="injectables/AppConfigService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppConfigService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppConfigModule.html" data-type="entity-link" >AppConfigModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppConfigModule-c2fea91d9fdee15118e45428f117b28ba3717e755454e30e61b09a07ca75b6198ee7dd2659664df0699d6633be626beda8c387d7b908bf5b7f971c30539374fe-8"' : 'data-bs-target="#xs-injectables-links-module-AppConfigModule-c2fea91d9fdee15118e45428f117b28ba3717e755454e30e61b09a07ca75b6198ee7dd2659664df0699d6633be626beda8c387d7b908bf5b7f971c30539374fe-8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppConfigModule-c2fea91d9fdee15118e45428f117b28ba3717e755454e30e61b09a07ca75b6198ee7dd2659664df0699d6633be626beda8c387d7b908bf5b7f971c30539374fe-8"' :
                                        'id="xs-injectables-links-module-AppConfigModule-c2fea91d9fdee15118e45428f117b28ba3717e755454e30e61b09a07ca75b6198ee7dd2659664df0699d6633be626beda8c387d7b908bf5b7f971c30539374fe-8"' }>
                                        <li class="link">
                                            <a href="injectables/AppConfigService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppConfigService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppConfigModule.html" data-type="entity-link" >AppConfigModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppConfigModule-ffbdabc07626d271789cef384381a8617fa2a75cdf7681703dc61cd7608144d1d2ce226d562dea75bc835b346c26f91b45449060adb7f1ea3e145dd4e8d1e7fd-9"' : 'data-bs-target="#xs-injectables-links-module-AppConfigModule-ffbdabc07626d271789cef384381a8617fa2a75cdf7681703dc61cd7608144d1d2ce226d562dea75bc835b346c26f91b45449060adb7f1ea3e145dd4e8d1e7fd-9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppConfigModule-ffbdabc07626d271789cef384381a8617fa2a75cdf7681703dc61cd7608144d1d2ce226d562dea75bc835b346c26f91b45449060adb7f1ea3e145dd4e8d1e7fd-9"' :
                                        'id="xs-injectables-links-module-AppConfigModule-ffbdabc07626d271789cef384381a8617fa2a75cdf7681703dc61cd7608144d1d2ce226d562dea75bc835b346c26f91b45449060adb7f1ea3e145dd4e8d1e7fd-9"' }>
                                        <li class="link">
                                            <a href="injectables/AppConfigService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppConfigService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppConfigModule.html" data-type="entity-link" >AppConfigModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppConfigModule-a91bfc37d317c0b88d2e20c42f8bcd6fa651c173394d3e45c630c600fa9e629a1257d2c0aeadd935a94d069df6fde15b544cedbfc4b8ea5403ffc70ce43ed2e8-10"' : 'data-bs-target="#xs-injectables-links-module-AppConfigModule-a91bfc37d317c0b88d2e20c42f8bcd6fa651c173394d3e45c630c600fa9e629a1257d2c0aeadd935a94d069df6fde15b544cedbfc4b8ea5403ffc70ce43ed2e8-10"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppConfigModule-a91bfc37d317c0b88d2e20c42f8bcd6fa651c173394d3e45c630c600fa9e629a1257d2c0aeadd935a94d069df6fde15b544cedbfc4b8ea5403ffc70ce43ed2e8-10"' :
                                        'id="xs-injectables-links-module-AppConfigModule-a91bfc37d317c0b88d2e20c42f8bcd6fa651c173394d3e45c630c600fa9e629a1257d2c0aeadd935a94d069df6fde15b544cedbfc4b8ea5403ffc70ce43ed2e8-10"' }>
                                        <li class="link">
                                            <a href="injectables/AppConfigService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppConfigService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppConfigModule.html" data-type="entity-link" >AppConfigModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppConfigModule-bedca50173e1f9a8de0c1fe20497ce1442e4847b5259c7bc9570fea6416240c598fac1dea14e9929b81db0b0768c12a429515065e8196dadf03d2a3db44e78fc-11"' : 'data-bs-target="#xs-injectables-links-module-AppConfigModule-bedca50173e1f9a8de0c1fe20497ce1442e4847b5259c7bc9570fea6416240c598fac1dea14e9929b81db0b0768c12a429515065e8196dadf03d2a3db44e78fc-11"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppConfigModule-bedca50173e1f9a8de0c1fe20497ce1442e4847b5259c7bc9570fea6416240c598fac1dea14e9929b81db0b0768c12a429515065e8196dadf03d2a3db44e78fc-11"' :
                                        'id="xs-injectables-links-module-AppConfigModule-bedca50173e1f9a8de0c1fe20497ce1442e4847b5259c7bc9570fea6416240c598fac1dea14e9929b81db0b0768c12a429515065e8196dadf03d2a3db44e78fc-11"' }>
                                        <li class="link">
                                            <a href="injectables/AppConfigService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppConfigService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppConfigModule.html" data-type="entity-link" >AppConfigModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppConfigModule-bbe4c57c28886d06228895a134fefb28537971b2c5a5665871358427cda8d041360b0a9e67727dca023f22bd38983655308eb340242ac74721e46c5597ab857b-12"' : 'data-bs-target="#xs-injectables-links-module-AppConfigModule-bbe4c57c28886d06228895a134fefb28537971b2c5a5665871358427cda8d041360b0a9e67727dca023f22bd38983655308eb340242ac74721e46c5597ab857b-12"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppConfigModule-bbe4c57c28886d06228895a134fefb28537971b2c5a5665871358427cda8d041360b0a9e67727dca023f22bd38983655308eb340242ac74721e46c5597ab857b-12"' :
                                        'id="xs-injectables-links-module-AppConfigModule-bbe4c57c28886d06228895a134fefb28537971b2c5a5665871358427cda8d041360b0a9e67727dca023f22bd38983655308eb340242ac74721e46c5597ab857b-12"' }>
                                        <li class="link">
                                            <a href="injectables/AppConfigService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppConfigService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppConfigModule.html" data-type="entity-link" >AppConfigModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppConfigModule-5f334cb1359d04415de6f14474464c2d5f503014697f98380e33d2e10efa197bba83395d9762dbac9525a428a32f336ad451ea7a3df45a7e7e19a7e658ce3d41-13"' : 'data-bs-target="#xs-injectables-links-module-AppConfigModule-5f334cb1359d04415de6f14474464c2d5f503014697f98380e33d2e10efa197bba83395d9762dbac9525a428a32f336ad451ea7a3df45a7e7e19a7e658ce3d41-13"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppConfigModule-5f334cb1359d04415de6f14474464c2d5f503014697f98380e33d2e10efa197bba83395d9762dbac9525a428a32f336ad451ea7a3df45a7e7e19a7e658ce3d41-13"' :
                                        'id="xs-injectables-links-module-AppConfigModule-5f334cb1359d04415de6f14474464c2d5f503014697f98380e33d2e10efa197bba83395d9762dbac9525a428a32f336ad451ea7a3df45a7e7e19a7e658ce3d41-13"' }>
                                        <li class="link">
                                            <a href="injectables/AppConfigService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppConfigService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppHealthModule.html" data-type="entity-link" >AppHealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppHealthModule-c01f2596f5d44109a2441431c99319d98c10f8749c25782c2bd8a3816bd7b2d3a408f1a161211a203c1cb57baad082056613aebd4a2e8a43ffe6df3cd9737f33"' : 'data-bs-target="#xs-controllers-links-module-AppHealthModule-c01f2596f5d44109a2441431c99319d98c10f8749c25782c2bd8a3816bd7b2d3a408f1a161211a203c1cb57baad082056613aebd4a2e8a43ffe6df3cd9737f33"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppHealthModule-c01f2596f5d44109a2441431c99319d98c10f8749c25782c2bd8a3816bd7b2d3a408f1a161211a203c1cb57baad082056613aebd4a2e8a43ffe6df3cd9737f33"' :
                                            'id="xs-controllers-links-module-AppHealthModule-c01f2596f5d44109a2441431c99319d98c10f8749c25782c2bd8a3816bd7b2d3a408f1a161211a203c1cb57baad082056613aebd4a2e8a43ffe6df3cd9737f33"' }>
                                            <li class="link">
                                                <a href="controllers/AppHealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppHealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppHealthModule-c01f2596f5d44109a2441431c99319d98c10f8749c25782c2bd8a3816bd7b2d3a408f1a161211a203c1cb57baad082056613aebd4a2e8a43ffe6df3cd9737f33"' : 'data-bs-target="#xs-injectables-links-module-AppHealthModule-c01f2596f5d44109a2441431c99319d98c10f8749c25782c2bd8a3816bd7b2d3a408f1a161211a203c1cb57baad082056613aebd4a2e8a43ffe6df3cd9737f33"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppHealthModule-c01f2596f5d44109a2441431c99319d98c10f8749c25782c2bd8a3816bd7b2d3a408f1a161211a203c1cb57baad082056613aebd4a2e8a43ffe6df3cd9737f33"' :
                                        'id="xs-injectables-links-module-AppHealthModule-c01f2596f5d44109a2441431c99319d98c10f8749c25782c2bd8a3816bd7b2d3a408f1a161211a203c1cb57baad082056613aebd4a2e8a43ffe6df3cd9737f33"' }>
                                        <li class="link">
                                            <a href="injectables/AppHealthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppHealthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppHealthModule.html" data-type="entity-link" >AppHealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppHealthModule-38b46530f3ed5808574b5fd097f0e5fe689b707e52cb90ddb5d9a4abd3b00a3ccfc40fdb173256754bef0b90e195696b83928357bad8fbb011b721348f2f4c73-1"' : 'data-bs-target="#xs-controllers-links-module-AppHealthModule-38b46530f3ed5808574b5fd097f0e5fe689b707e52cb90ddb5d9a4abd3b00a3ccfc40fdb173256754bef0b90e195696b83928357bad8fbb011b721348f2f4c73-1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppHealthModule-38b46530f3ed5808574b5fd097f0e5fe689b707e52cb90ddb5d9a4abd3b00a3ccfc40fdb173256754bef0b90e195696b83928357bad8fbb011b721348f2f4c73-1"' :
                                            'id="xs-controllers-links-module-AppHealthModule-38b46530f3ed5808574b5fd097f0e5fe689b707e52cb90ddb5d9a4abd3b00a3ccfc40fdb173256754bef0b90e195696b83928357bad8fbb011b721348f2f4c73-1"' }>
                                            <li class="link">
                                                <a href="controllers/AppHealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppHealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppHealthModule.html" data-type="entity-link" >AppHealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppHealthModule-2e7fa29949e901732ed4d442c1966d7deb45bf5b4bceda0eace89eba9a93d8712057190c9a8c3f31fcb5a8edcf3a7dfd30248c1488ded912ac18b9d84a3d101b-2"' : 'data-bs-target="#xs-controllers-links-module-AppHealthModule-2e7fa29949e901732ed4d442c1966d7deb45bf5b4bceda0eace89eba9a93d8712057190c9a8c3f31fcb5a8edcf3a7dfd30248c1488ded912ac18b9d84a3d101b-2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppHealthModule-2e7fa29949e901732ed4d442c1966d7deb45bf5b4bceda0eace89eba9a93d8712057190c9a8c3f31fcb5a8edcf3a7dfd30248c1488ded912ac18b9d84a3d101b-2"' :
                                            'id="xs-controllers-links-module-AppHealthModule-2e7fa29949e901732ed4d442c1966d7deb45bf5b4bceda0eace89eba9a93d8712057190c9a8c3f31fcb5a8edcf3a7dfd30248c1488ded912ac18b9d84a3d101b-2"' }>
                                            <li class="link">
                                                <a href="controllers/AppHealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppHealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppHealthModule.html" data-type="entity-link" >AppHealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppHealthModule-2e7fa29949e901732ed4d442c1966d7deb45bf5b4bceda0eace89eba9a93d8712057190c9a8c3f31fcb5a8edcf3a7dfd30248c1488ded912ac18b9d84a3d101b-3"' : 'data-bs-target="#xs-controllers-links-module-AppHealthModule-2e7fa29949e901732ed4d442c1966d7deb45bf5b4bceda0eace89eba9a93d8712057190c9a8c3f31fcb5a8edcf3a7dfd30248c1488ded912ac18b9d84a3d101b-3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppHealthModule-2e7fa29949e901732ed4d442c1966d7deb45bf5b4bceda0eace89eba9a93d8712057190c9a8c3f31fcb5a8edcf3a7dfd30248c1488ded912ac18b9d84a3d101b-3"' :
                                            'id="xs-controllers-links-module-AppHealthModule-2e7fa29949e901732ed4d442c1966d7deb45bf5b4bceda0eace89eba9a93d8712057190c9a8c3f31fcb5a8edcf3a7dfd30248c1488ded912ac18b9d84a3d101b-3"' }>
                                            <li class="link">
                                                <a href="controllers/AppHealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppHealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppHealthModule.html" data-type="entity-link" >AppHealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppHealthModule-11afee48b63c5e1c9151b8303689f180166453fdda19679544caa07ae2b70116ed45aefa053dba97ba2ef2905e17ac974775d2d6a656627568517d4ebd01c2dc-4"' : 'data-bs-target="#xs-controllers-links-module-AppHealthModule-11afee48b63c5e1c9151b8303689f180166453fdda19679544caa07ae2b70116ed45aefa053dba97ba2ef2905e17ac974775d2d6a656627568517d4ebd01c2dc-4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppHealthModule-11afee48b63c5e1c9151b8303689f180166453fdda19679544caa07ae2b70116ed45aefa053dba97ba2ef2905e17ac974775d2d6a656627568517d4ebd01c2dc-4"' :
                                            'id="xs-controllers-links-module-AppHealthModule-11afee48b63c5e1c9151b8303689f180166453fdda19679544caa07ae2b70116ed45aefa053dba97ba2ef2905e17ac974775d2d6a656627568517d4ebd01c2dc-4"' }>
                                            <li class="link">
                                                <a href="controllers/AppHealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppHealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppHealthModule-11afee48b63c5e1c9151b8303689f180166453fdda19679544caa07ae2b70116ed45aefa053dba97ba2ef2905e17ac974775d2d6a656627568517d4ebd01c2dc-4"' : 'data-bs-target="#xs-injectables-links-module-AppHealthModule-11afee48b63c5e1c9151b8303689f180166453fdda19679544caa07ae2b70116ed45aefa053dba97ba2ef2905e17ac974775d2d6a656627568517d4ebd01c2dc-4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppHealthModule-11afee48b63c5e1c9151b8303689f180166453fdda19679544caa07ae2b70116ed45aefa053dba97ba2ef2905e17ac974775d2d6a656627568517d4ebd01c2dc-4"' :
                                        'id="xs-injectables-links-module-AppHealthModule-11afee48b63c5e1c9151b8303689f180166453fdda19679544caa07ae2b70116ed45aefa053dba97ba2ef2905e17ac974775d2d6a656627568517d4ebd01c2dc-4"' }>
                                        <li class="link">
                                            <a href="injectables/AppHealthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppHealthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppHealthModule.html" data-type="entity-link" >AppHealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppHealthModule-2e7fa29949e901732ed4d442c1966d7deb45bf5b4bceda0eace89eba9a93d8712057190c9a8c3f31fcb5a8edcf3a7dfd30248c1488ded912ac18b9d84a3d101b-5"' : 'data-bs-target="#xs-controllers-links-module-AppHealthModule-2e7fa29949e901732ed4d442c1966d7deb45bf5b4bceda0eace89eba9a93d8712057190c9a8c3f31fcb5a8edcf3a7dfd30248c1488ded912ac18b9d84a3d101b-5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppHealthModule-2e7fa29949e901732ed4d442c1966d7deb45bf5b4bceda0eace89eba9a93d8712057190c9a8c3f31fcb5a8edcf3a7dfd30248c1488ded912ac18b9d84a3d101b-5"' :
                                            'id="xs-controllers-links-module-AppHealthModule-2e7fa29949e901732ed4d442c1966d7deb45bf5b4bceda0eace89eba9a93d8712057190c9a8c3f31fcb5a8edcf3a7dfd30248c1488ded912ac18b9d84a3d101b-5"' }>
                                            <li class="link">
                                                <a href="controllers/AppHealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppHealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppHealthModule.html" data-type="entity-link" >AppHealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppHealthModule-2e7fa29949e901732ed4d442c1966d7deb45bf5b4bceda0eace89eba9a93d8712057190c9a8c3f31fcb5a8edcf3a7dfd30248c1488ded912ac18b9d84a3d101b-6"' : 'data-bs-target="#xs-controllers-links-module-AppHealthModule-2e7fa29949e901732ed4d442c1966d7deb45bf5b4bceda0eace89eba9a93d8712057190c9a8c3f31fcb5a8edcf3a7dfd30248c1488ded912ac18b9d84a3d101b-6"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppHealthModule-2e7fa29949e901732ed4d442c1966d7deb45bf5b4bceda0eace89eba9a93d8712057190c9a8c3f31fcb5a8edcf3a7dfd30248c1488ded912ac18b9d84a3d101b-6"' :
                                            'id="xs-controllers-links-module-AppHealthModule-2e7fa29949e901732ed4d442c1966d7deb45bf5b4bceda0eace89eba9a93d8712057190c9a8c3f31fcb5a8edcf3a7dfd30248c1488ded912ac18b9d84a3d101b-6"' }>
                                            <li class="link">
                                                <a href="controllers/AppHealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppHealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppHealthModule.html" data-type="entity-link" >AppHealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppHealthModule-c01f2596f5d44109a2441431c99319d98c10f8749c25782c2bd8a3816bd7b2d3a408f1a161211a203c1cb57baad082056613aebd4a2e8a43ffe6df3cd9737f33-7"' : 'data-bs-target="#xs-controllers-links-module-AppHealthModule-c01f2596f5d44109a2441431c99319d98c10f8749c25782c2bd8a3816bd7b2d3a408f1a161211a203c1cb57baad082056613aebd4a2e8a43ffe6df3cd9737f33-7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppHealthModule-c01f2596f5d44109a2441431c99319d98c10f8749c25782c2bd8a3816bd7b2d3a408f1a161211a203c1cb57baad082056613aebd4a2e8a43ffe6df3cd9737f33-7"' :
                                            'id="xs-controllers-links-module-AppHealthModule-c01f2596f5d44109a2441431c99319d98c10f8749c25782c2bd8a3816bd7b2d3a408f1a161211a203c1cb57baad082056613aebd4a2e8a43ffe6df3cd9737f33-7"' }>
                                            <li class="link">
                                                <a href="controllers/AppHealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppHealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppHealthModule-c01f2596f5d44109a2441431c99319d98c10f8749c25782c2bd8a3816bd7b2d3a408f1a161211a203c1cb57baad082056613aebd4a2e8a43ffe6df3cd9737f33-7"' : 'data-bs-target="#xs-injectables-links-module-AppHealthModule-c01f2596f5d44109a2441431c99319d98c10f8749c25782c2bd8a3816bd7b2d3a408f1a161211a203c1cb57baad082056613aebd4a2e8a43ffe6df3cd9737f33-7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppHealthModule-c01f2596f5d44109a2441431c99319d98c10f8749c25782c2bd8a3816bd7b2d3a408f1a161211a203c1cb57baad082056613aebd4a2e8a43ffe6df3cd9737f33-7"' :
                                        'id="xs-injectables-links-module-AppHealthModule-c01f2596f5d44109a2441431c99319d98c10f8749c25782c2bd8a3816bd7b2d3a408f1a161211a203c1cb57baad082056613aebd4a2e8a43ffe6df3cd9737f33-7"' }>
                                        <li class="link">
                                            <a href="injectables/AppHealthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppHealthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppHealthModule.html" data-type="entity-link" >AppHealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppHealthModule-2e7fa29949e901732ed4d442c1966d7deb45bf5b4bceda0eace89eba9a93d8712057190c9a8c3f31fcb5a8edcf3a7dfd30248c1488ded912ac18b9d84a3d101b-8"' : 'data-bs-target="#xs-controllers-links-module-AppHealthModule-2e7fa29949e901732ed4d442c1966d7deb45bf5b4bceda0eace89eba9a93d8712057190c9a8c3f31fcb5a8edcf3a7dfd30248c1488ded912ac18b9d84a3d101b-8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppHealthModule-2e7fa29949e901732ed4d442c1966d7deb45bf5b4bceda0eace89eba9a93d8712057190c9a8c3f31fcb5a8edcf3a7dfd30248c1488ded912ac18b9d84a3d101b-8"' :
                                            'id="xs-controllers-links-module-AppHealthModule-2e7fa29949e901732ed4d442c1966d7deb45bf5b4bceda0eace89eba9a93d8712057190c9a8c3f31fcb5a8edcf3a7dfd30248c1488ded912ac18b9d84a3d101b-8"' }>
                                            <li class="link">
                                                <a href="controllers/AppHealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppHealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppHealthModule.html" data-type="entity-link" >AppHealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppHealthModule-2e7fa29949e901732ed4d442c1966d7deb45bf5b4bceda0eace89eba9a93d8712057190c9a8c3f31fcb5a8edcf3a7dfd30248c1488ded912ac18b9d84a3d101b-9"' : 'data-bs-target="#xs-controllers-links-module-AppHealthModule-2e7fa29949e901732ed4d442c1966d7deb45bf5b4bceda0eace89eba9a93d8712057190c9a8c3f31fcb5a8edcf3a7dfd30248c1488ded912ac18b9d84a3d101b-9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppHealthModule-2e7fa29949e901732ed4d442c1966d7deb45bf5b4bceda0eace89eba9a93d8712057190c9a8c3f31fcb5a8edcf3a7dfd30248c1488ded912ac18b9d84a3d101b-9"' :
                                            'id="xs-controllers-links-module-AppHealthModule-2e7fa29949e901732ed4d442c1966d7deb45bf5b4bceda0eace89eba9a93d8712057190c9a8c3f31fcb5a8edcf3a7dfd30248c1488ded912ac18b9d84a3d101b-9"' }>
                                            <li class="link">
                                                <a href="controllers/AppHealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppHealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppHealthModule.html" data-type="entity-link" >AppHealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppHealthModule-c01f2596f5d44109a2441431c99319d98c10f8749c25782c2bd8a3816bd7b2d3a408f1a161211a203c1cb57baad082056613aebd4a2e8a43ffe6df3cd9737f33-10"' : 'data-bs-target="#xs-controllers-links-module-AppHealthModule-c01f2596f5d44109a2441431c99319d98c10f8749c25782c2bd8a3816bd7b2d3a408f1a161211a203c1cb57baad082056613aebd4a2e8a43ffe6df3cd9737f33-10"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppHealthModule-c01f2596f5d44109a2441431c99319d98c10f8749c25782c2bd8a3816bd7b2d3a408f1a161211a203c1cb57baad082056613aebd4a2e8a43ffe6df3cd9737f33-10"' :
                                            'id="xs-controllers-links-module-AppHealthModule-c01f2596f5d44109a2441431c99319d98c10f8749c25782c2bd8a3816bd7b2d3a408f1a161211a203c1cb57baad082056613aebd4a2e8a43ffe6df3cd9737f33-10"' }>
                                            <li class="link">
                                                <a href="controllers/AppHealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppHealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppHealthModule-c01f2596f5d44109a2441431c99319d98c10f8749c25782c2bd8a3816bd7b2d3a408f1a161211a203c1cb57baad082056613aebd4a2e8a43ffe6df3cd9737f33-10"' : 'data-bs-target="#xs-injectables-links-module-AppHealthModule-c01f2596f5d44109a2441431c99319d98c10f8749c25782c2bd8a3816bd7b2d3a408f1a161211a203c1cb57baad082056613aebd4a2e8a43ffe6df3cd9737f33-10"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppHealthModule-c01f2596f5d44109a2441431c99319d98c10f8749c25782c2bd8a3816bd7b2d3a408f1a161211a203c1cb57baad082056613aebd4a2e8a43ffe6df3cd9737f33-10"' :
                                        'id="xs-injectables-links-module-AppHealthModule-c01f2596f5d44109a2441431c99319d98c10f8749c25782c2bd8a3816bd7b2d3a408f1a161211a203c1cb57baad082056613aebd4a2e8a43ffe6df3cd9737f33-10"' }>
                                        <li class="link">
                                            <a href="injectables/AppHealthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppHealthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppHealthModule.html" data-type="entity-link" >AppHealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppHealthModule-2e7fa29949e901732ed4d442c1966d7deb45bf5b4bceda0eace89eba9a93d8712057190c9a8c3f31fcb5a8edcf3a7dfd30248c1488ded912ac18b9d84a3d101b-11"' : 'data-bs-target="#xs-controllers-links-module-AppHealthModule-2e7fa29949e901732ed4d442c1966d7deb45bf5b4bceda0eace89eba9a93d8712057190c9a8c3f31fcb5a8edcf3a7dfd30248c1488ded912ac18b9d84a3d101b-11"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppHealthModule-2e7fa29949e901732ed4d442c1966d7deb45bf5b4bceda0eace89eba9a93d8712057190c9a8c3f31fcb5a8edcf3a7dfd30248c1488ded912ac18b9d84a3d101b-11"' :
                                            'id="xs-controllers-links-module-AppHealthModule-2e7fa29949e901732ed4d442c1966d7deb45bf5b4bceda0eace89eba9a93d8712057190c9a8c3f31fcb5a8edcf3a7dfd30248c1488ded912ac18b9d84a3d101b-11"' }>
                                            <li class="link">
                                                <a href="controllers/AppHealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppHealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppHealthModule.html" data-type="entity-link" >AppHealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppHealthModule-2e7fa29949e901732ed4d442c1966d7deb45bf5b4bceda0eace89eba9a93d8712057190c9a8c3f31fcb5a8edcf3a7dfd30248c1488ded912ac18b9d84a3d101b-12"' : 'data-bs-target="#xs-controllers-links-module-AppHealthModule-2e7fa29949e901732ed4d442c1966d7deb45bf5b4bceda0eace89eba9a93d8712057190c9a8c3f31fcb5a8edcf3a7dfd30248c1488ded912ac18b9d84a3d101b-12"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppHealthModule-2e7fa29949e901732ed4d442c1966d7deb45bf5b4bceda0eace89eba9a93d8712057190c9a8c3f31fcb5a8edcf3a7dfd30248c1488ded912ac18b9d84a3d101b-12"' :
                                            'id="xs-controllers-links-module-AppHealthModule-2e7fa29949e901732ed4d442c1966d7deb45bf5b4bceda0eace89eba9a93d8712057190c9a8c3f31fcb5a8edcf3a7dfd30248c1488ded912ac18b9d84a3d101b-12"' }>
                                            <li class="link">
                                                <a href="controllers/AppHealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppHealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppHealthModule.html" data-type="entity-link" >AppHealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppHealthModule-c01f2596f5d44109a2441431c99319d98c10f8749c25782c2bd8a3816bd7b2d3a408f1a161211a203c1cb57baad082056613aebd4a2e8a43ffe6df3cd9737f33-13"' : 'data-bs-target="#xs-controllers-links-module-AppHealthModule-c01f2596f5d44109a2441431c99319d98c10f8749c25782c2bd8a3816bd7b2d3a408f1a161211a203c1cb57baad082056613aebd4a2e8a43ffe6df3cd9737f33-13"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppHealthModule-c01f2596f5d44109a2441431c99319d98c10f8749c25782c2bd8a3816bd7b2d3a408f1a161211a203c1cb57baad082056613aebd4a2e8a43ffe6df3cd9737f33-13"' :
                                            'id="xs-controllers-links-module-AppHealthModule-c01f2596f5d44109a2441431c99319d98c10f8749c25782c2bd8a3816bd7b2d3a408f1a161211a203c1cb57baad082056613aebd4a2e8a43ffe6df3cd9737f33-13"' }>
                                            <li class="link">
                                                <a href="controllers/AppHealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppHealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppHealthModule-c01f2596f5d44109a2441431c99319d98c10f8749c25782c2bd8a3816bd7b2d3a408f1a161211a203c1cb57baad082056613aebd4a2e8a43ffe6df3cd9737f33-13"' : 'data-bs-target="#xs-injectables-links-module-AppHealthModule-c01f2596f5d44109a2441431c99319d98c10f8749c25782c2bd8a3816bd7b2d3a408f1a161211a203c1cb57baad082056613aebd4a2e8a43ffe6df3cd9737f33-13"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppHealthModule-c01f2596f5d44109a2441431c99319d98c10f8749c25782c2bd8a3816bd7b2d3a408f1a161211a203c1cb57baad082056613aebd4a2e8a43ffe6df3cd9737f33-13"' :
                                        'id="xs-injectables-links-module-AppHealthModule-c01f2596f5d44109a2441431c99319d98c10f8749c25782c2bd8a3816bd7b2d3a408f1a161211a203c1cb57baad082056613aebd4a2e8a43ffe6df3cd9737f33-13"' }>
                                        <li class="link">
                                            <a href="injectables/AppHealthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppHealthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppJwtModule.html" data-type="entity-link" >AppJwtModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-b2426faf5205df7b8f5651f4d0d4f6251fc0ffd14ca13e236dac474848520127cf99348a50c136edcc910a5edaf283cdb1e409353309d787bbbfafce68311a07-4"' : 'data-bs-target="#xs-controllers-links-module-AppModule-b2426faf5205df7b8f5651f4d0d4f6251fc0ffd14ca13e236dac474848520127cf99348a50c136edcc910a5edaf283cdb1e409353309d787bbbfafce68311a07-4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-b2426faf5205df7b8f5651f4d0d4f6251fc0ffd14ca13e236dac474848520127cf99348a50c136edcc910a5edaf283cdb1e409353309d787bbbfafce68311a07-4"' :
                                            'id="xs-controllers-links-module-AppModule-b2426faf5205df7b8f5651f4d0d4f6251fc0ffd14ca13e236dac474848520127cf99348a50c136edcc910a5edaf283cdb1e409353309d787bbbfafce68311a07-4"' }>
                                            <li class="link">
                                                <a href="controllers/EmailController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-b2426faf5205df7b8f5651f4d0d4f6251fc0ffd14ca13e236dac474848520127cf99348a50c136edcc910a5edaf283cdb1e409353309d787bbbfafce68311a07-4"' : 'data-bs-target="#xs-injectables-links-module-AppModule-b2426faf5205df7b8f5651f4d0d4f6251fc0ffd14ca13e236dac474848520127cf99348a50c136edcc910a5edaf283cdb1e409353309d787bbbfafce68311a07-4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-b2426faf5205df7b8f5651f4d0d4f6251fc0ffd14ca13e236dac474848520127cf99348a50c136edcc910a5edaf283cdb1e409353309d787bbbfafce68311a07-4"' :
                                        'id="xs-injectables-links-module-AppModule-b2426faf5205df7b8f5651f4d0d4f6251fc0ffd14ca13e236dac474848520127cf99348a50c136edcc910a5edaf283cdb1e409353309d787bbbfafce68311a07-4"' }>
                                        <li class="link">
                                            <a href="injectables/EmailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-e322573bf57cab506b92793c4fcb795a6dc0441f8be5985b0cdfe14638bc1ed6e0f85a6699448995982d75bde6eaf210a83ea489b9c622e8e52a39078d8d1472"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-e322573bf57cab506b92793c4fcb795a6dc0441f8be5985b0cdfe14638bc1ed6e0f85a6699448995982d75bde6eaf210a83ea489b9c622e8e52a39078d8d1472"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-e322573bf57cab506b92793c4fcb795a6dc0441f8be5985b0cdfe14638bc1ed6e0f85a6699448995982d75bde6eaf210a83ea489b9c622e8e52a39078d8d1472"' :
                                            'id="xs-controllers-links-module-AuthModule-e322573bf57cab506b92793c4fcb795a6dc0441f8be5985b0cdfe14638bc1ed6e0f85a6699448995982d75bde6eaf210a83ea489b9c622e8e52a39078d8d1472"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-e322573bf57cab506b92793c4fcb795a6dc0441f8be5985b0cdfe14638bc1ed6e0f85a6699448995982d75bde6eaf210a83ea489b9c622e8e52a39078d8d1472"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-e322573bf57cab506b92793c4fcb795a6dc0441f8be5985b0cdfe14638bc1ed6e0f85a6699448995982d75bde6eaf210a83ea489b9c622e8e52a39078d8d1472"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-e322573bf57cab506b92793c4fcb795a6dc0441f8be5985b0cdfe14638bc1ed6e0f85a6699448995982d75bde6eaf210a83ea489b9c622e8e52a39078d8d1472"' :
                                        'id="xs-injectables-links-module-AuthModule-e322573bf57cab506b92793c4fcb795a6dc0441f8be5985b0cdfe14638bc1ed6e0f85a6699448995982d75bde6eaf210a83ea489b9c622e8e52a39078d8d1472"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CloudModule.html" data-type="entity-link" >CloudModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CloudModule-fae8d6b077e7f974578d9e9f06885f973ff0bab986740ce0c740fa5bfc69b172682dfd73935397aeba12e71d6754ade28a8f330a18aefb359b2f789cbc88772f"' : 'data-bs-target="#xs-controllers-links-module-CloudModule-fae8d6b077e7f974578d9e9f06885f973ff0bab986740ce0c740fa5bfc69b172682dfd73935397aeba12e71d6754ade28a8f330a18aefb359b2f789cbc88772f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CloudModule-fae8d6b077e7f974578d9e9f06885f973ff0bab986740ce0c740fa5bfc69b172682dfd73935397aeba12e71d6754ade28a8f330a18aefb359b2f789cbc88772f"' :
                                            'id="xs-controllers-links-module-CloudModule-fae8d6b077e7f974578d9e9f06885f973ff0bab986740ce0c740fa5bfc69b172682dfd73935397aeba12e71d6754ade28a8f330a18aefb359b2f789cbc88772f"' }>
                                            <li class="link">
                                                <a href="controllers/CloudController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CloudController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CloudModule-fae8d6b077e7f974578d9e9f06885f973ff0bab986740ce0c740fa5bfc69b172682dfd73935397aeba12e71d6754ade28a8f330a18aefb359b2f789cbc88772f"' : 'data-bs-target="#xs-injectables-links-module-CloudModule-fae8d6b077e7f974578d9e9f06885f973ff0bab986740ce0c740fa5bfc69b172682dfd73935397aeba12e71d6754ade28a8f330a18aefb359b2f789cbc88772f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CloudModule-fae8d6b077e7f974578d9e9f06885f973ff0bab986740ce0c740fa5bfc69b172682dfd73935397aeba12e71d6754ade28a8f330a18aefb359b2f789cbc88772f"' :
                                        'id="xs-injectables-links-module-CloudModule-fae8d6b077e7f974578d9e9f06885f973ff0bab986740ce0c740fa5bfc69b172682dfd73935397aeba12e71d6754ade28a8f330a18aefb359b2f789cbc88772f"' }>
                                        <li class="link">
                                            <a href="injectables/CloudService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CloudService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CommentAggregatorCacheModule.html" data-type="entity-link" >CommentAggregatorCacheModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CommentAggregatorCacheModule-28ad48b977b341fe447d5f6e447f66b6b28b68910ea428528ee6a83509107c48aec675bbe9d5d4a8ce27eb8b616cccf46aaa9f753665125b4119020bf8212b58"' : 'data-bs-target="#xs-injectables-links-module-CommentAggregatorCacheModule-28ad48b977b341fe447d5f6e447f66b6b28b68910ea428528ee6a83509107c48aec675bbe9d5d4a8ce27eb8b616cccf46aaa9f753665125b4119020bf8212b58"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CommentAggregatorCacheModule-28ad48b977b341fe447d5f6e447f66b6b28b68910ea428528ee6a83509107c48aec675bbe9d5d4a8ce27eb8b616cccf46aaa9f753665125b4119020bf8212b58"' :
                                        'id="xs-injectables-links-module-CommentAggregatorCacheModule-28ad48b977b341fe447d5f6e447f66b6b28b68910ea428528ee6a83509107c48aec675bbe9d5d4a8ce27eb8b616cccf46aaa9f753665125b4119020bf8212b58"' }>
                                        <li class="link">
                                            <a href="injectables/CommentAggregateFactory.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommentAggregateFactory</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CommentAggregatePersistance.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommentAggregatePersistance</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CommentAggregatorCacheService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommentAggregatorCacheService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CommentRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommentRepo</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CommentsAggregatorModule.html" data-type="entity-link" >CommentsAggregatorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CommentsAggregatorModule-0930c45062e29aceaae6c67309e6c1d4e8b421a446da1e147e83e6c07478ba556738071b8051907fe012f9ae08abc8c085d8630051e23a377613cb8401b75159"' : 'data-bs-target="#xs-controllers-links-module-CommentsAggregatorModule-0930c45062e29aceaae6c67309e6c1d4e8b421a446da1e147e83e6c07478ba556738071b8051907fe012f9ae08abc8c085d8630051e23a377613cb8401b75159"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CommentsAggregatorModule-0930c45062e29aceaae6c67309e6c1d4e8b421a446da1e147e83e6c07478ba556738071b8051907fe012f9ae08abc8c085d8630051e23a377613cb8401b75159"' :
                                            'id="xs-controllers-links-module-CommentsAggregatorModule-0930c45062e29aceaae6c67309e6c1d4e8b421a446da1e147e83e6c07478ba556738071b8051907fe012f9ae08abc8c085d8630051e23a377613cb8401b75159"' }>
                                            <li class="link">
                                                <a href="controllers/CommentsAggregatorController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommentsAggregatorController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CommentsAggregatorModule-0930c45062e29aceaae6c67309e6c1d4e8b421a446da1e147e83e6c07478ba556738071b8051907fe012f9ae08abc8c085d8630051e23a377613cb8401b75159"' : 'data-bs-target="#xs-injectables-links-module-CommentsAggregatorModule-0930c45062e29aceaae6c67309e6c1d4e8b421a446da1e147e83e6c07478ba556738071b8051907fe012f9ae08abc8c085d8630051e23a377613cb8401b75159"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CommentsAggregatorModule-0930c45062e29aceaae6c67309e6c1d4e8b421a446da1e147e83e6c07478ba556738071b8051907fe012f9ae08abc8c085d8630051e23a377613cb8401b75159"' :
                                        'id="xs-injectables-links-module-CommentsAggregatorModule-0930c45062e29aceaae6c67309e6c1d4e8b421a446da1e147e83e6c07478ba556738071b8051907fe012f9ae08abc8c085d8630051e23a377613cb8401b75159"' }>
                                        <li class="link">
                                            <a href="injectables/AppConfigService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppConfigService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CommentAggregateFactory.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommentAggregateFactory</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CommentAggregatePersistance.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommentAggregatePersistance</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CommentAggregatorCacheService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommentAggregatorCacheService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CommentRepo.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommentRepo</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CommentsAggregatorService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommentsAggregatorService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CommentsCacheModule.html" data-type="entity-link" >CommentsCacheModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CommentsCacheModule-90ffac04f01cf15ce40f2d50b254eaa8b5565a039c58ec01b872395b53c70c7c9e6e9afba092593f15e4d6356657117a481deccaef32cc7c061df21a02f9d8d1"' : 'data-bs-target="#xs-injectables-links-module-CommentsCacheModule-90ffac04f01cf15ce40f2d50b254eaa8b5565a039c58ec01b872395b53c70c7c9e6e9afba092593f15e4d6356657117a481deccaef32cc7c061df21a02f9d8d1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CommentsCacheModule-90ffac04f01cf15ce40f2d50b254eaa8b5565a039c58ec01b872395b53c70c7c9e6e9afba092593f15e4d6356657117a481deccaef32cc7c061df21a02f9d8d1"' :
                                        'id="xs-injectables-links-module-CommentsCacheModule-90ffac04f01cf15ce40f2d50b254eaa8b5565a039c58ec01b872395b53c70c7c9e6e9afba092593f15e4d6356657117a481deccaef32cc7c061df21a02f9d8d1"' }>
                                        <li class="link">
                                            <a href="injectables/CommentsCacheService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommentsCacheService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CommentsModule.html" data-type="entity-link" >CommentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CommentsModule-6c743e8a6a719e4a878f5984d624d8f7cff8c7670a964fe90249a7015eb4498da8a8e2f63f578725fdca5c3b5f6c0c96df069b78bb9850f557dc2f108fc4c529"' : 'data-bs-target="#xs-controllers-links-module-CommentsModule-6c743e8a6a719e4a878f5984d624d8f7cff8c7670a964fe90249a7015eb4498da8a8e2f63f578725fdca5c3b5f6c0c96df069b78bb9850f557dc2f108fc4c529"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CommentsModule-6c743e8a6a719e4a878f5984d624d8f7cff8c7670a964fe90249a7015eb4498da8a8e2f63f578725fdca5c3b5f6c0c96df069b78bb9850f557dc2f108fc4c529"' :
                                            'id="xs-controllers-links-module-CommentsModule-6c743e8a6a719e4a878f5984d624d8f7cff8c7670a964fe90249a7015eb4498da8a8e2f63f578725fdca5c3b5f6c0c96df069b78bb9850f557dc2f108fc4c529"' }>
                                            <li class="link">
                                                <a href="controllers/CommentsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommentsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CommentsModule-6c743e8a6a719e4a878f5984d624d8f7cff8c7670a964fe90249a7015eb4498da8a8e2f63f578725fdca5c3b5f6c0c96df069b78bb9850f557dc2f108fc4c529"' : 'data-bs-target="#xs-injectables-links-module-CommentsModule-6c743e8a6a719e4a878f5984d624d8f7cff8c7670a964fe90249a7015eb4498da8a8e2f63f578725fdca5c3b5f6c0c96df069b78bb9850f557dc2f108fc4c529"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CommentsModule-6c743e8a6a719e4a878f5984d624d8f7cff8c7670a964fe90249a7015eb4498da8a8e2f63f578725fdca5c3b5f6c0c96df069b78bb9850f557dc2f108fc4c529"' :
                                        'id="xs-injectables-links-module-CommentsModule-6c743e8a6a719e4a878f5984d624d8f7cff8c7670a964fe90249a7015eb4498da8a8e2f63f578725fdca5c3b5f6c0c96df069b78bb9850f557dc2f108fc4c529"' }>
                                        <li class="link">
                                            <a href="injectables/CommentsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommentsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CommentsModule.html" data-type="entity-link" >CommentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-CommentsModule-c28d1fcaf046c6f3983aa05f49c0cb6e80bb0efda1a6ba2a802308987f6e3b29b542b4ac16331f9765a02624d3bbf0a5205bba8fe25b1c99a18c3da96887f6a4-1"' : 'data-bs-target="#xs-controllers-links-module-CommentsModule-c28d1fcaf046c6f3983aa05f49c0cb6e80bb0efda1a6ba2a802308987f6e3b29b542b4ac16331f9765a02624d3bbf0a5205bba8fe25b1c99a18c3da96887f6a4-1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CommentsModule-c28d1fcaf046c6f3983aa05f49c0cb6e80bb0efda1a6ba2a802308987f6e3b29b542b4ac16331f9765a02624d3bbf0a5205bba8fe25b1c99a18c3da96887f6a4-1"' :
                                            'id="xs-controllers-links-module-CommentsModule-c28d1fcaf046c6f3983aa05f49c0cb6e80bb0efda1a6ba2a802308987f6e3b29b542b4ac16331f9765a02624d3bbf0a5205bba8fe25b1c99a18c3da96887f6a4-1"' }>
                                            <li class="link">
                                                <a href="controllers/CommentsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommentsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CommentsModule-c28d1fcaf046c6f3983aa05f49c0cb6e80bb0efda1a6ba2a802308987f6e3b29b542b4ac16331f9765a02624d3bbf0a5205bba8fe25b1c99a18c3da96887f6a4-1"' : 'data-bs-target="#xs-injectables-links-module-CommentsModule-c28d1fcaf046c6f3983aa05f49c0cb6e80bb0efda1a6ba2a802308987f6e3b29b542b4ac16331f9765a02624d3bbf0a5205bba8fe25b1c99a18c3da96887f6a4-1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CommentsModule-c28d1fcaf046c6f3983aa05f49c0cb6e80bb0efda1a6ba2a802308987f6e3b29b542b4ac16331f9765a02624d3bbf0a5205bba8fe25b1c99a18c3da96887f6a4-1"' :
                                        'id="xs-injectables-links-module-CommentsModule-c28d1fcaf046c6f3983aa05f49c0cb6e80bb0efda1a6ba2a802308987f6e3b29b542b4ac16331f9765a02624d3bbf0a5205bba8fe25b1c99a18c3da96887f6a4-1"' }>
                                        <li class="link">
                                            <a href="injectables/CommentsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommentsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/EmailModule.html" data-type="entity-link" >EmailModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/GatewayAuthModule.html" data-type="entity-link" >GatewayAuthModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-GatewayAuthModule-8968a076cb1a9a5544e1c7ec92f5bd12522b0bce087fc51144e76a3b2ef1aa0c61addf9b49648eaecbfd5886a073f6053b9226d344fe4da618ee23bb95c14f5c"' : 'data-bs-target="#xs-injectables-links-module-GatewayAuthModule-8968a076cb1a9a5544e1c7ec92f5bd12522b0bce087fc51144e76a3b2ef1aa0c61addf9b49648eaecbfd5886a073f6053b9226d344fe4da618ee23bb95c14f5c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-GatewayAuthModule-8968a076cb1a9a5544e1c7ec92f5bd12522b0bce087fc51144e76a3b2ef1aa0c61addf9b49648eaecbfd5886a073f6053b9226d344fe4da618ee23bb95c14f5c"' :
                                        'id="xs-injectables-links-module-GatewayAuthModule-8968a076cb1a9a5544e1c7ec92f5bd12522b0bce087fc51144e76a3b2ef1aa0c61addf9b49648eaecbfd5886a073f6053b9226d344fe4da618ee23bb95c14f5c"' }>
                                        <li class="link">
                                            <a href="injectables/Auth0Strategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Auth0Strategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HubModule.html" data-type="entity-link" >HubModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-HubModule-40916370a6eba988f810e817b2119996b46a22f57f165195ead0fd69dd20dd5ccbf209eaaea15ecd769979283a7d075e3c978c184ddb9080229d59190970c383"' : 'data-bs-target="#xs-controllers-links-module-HubModule-40916370a6eba988f810e817b2119996b46a22f57f165195ead0fd69dd20dd5ccbf209eaaea15ecd769979283a7d075e3c978c184ddb9080229d59190970c383"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HubModule-40916370a6eba988f810e817b2119996b46a22f57f165195ead0fd69dd20dd5ccbf209eaaea15ecd769979283a7d075e3c978c184ddb9080229d59190970c383"' :
                                            'id="xs-controllers-links-module-HubModule-40916370a6eba988f810e817b2119996b46a22f57f165195ead0fd69dd20dd5ccbf209eaaea15ecd769979283a7d075e3c978c184ddb9080229d59190970c383"' }>
                                            <li class="link">
                                                <a href="controllers/HubController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HubController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-HubModule-40916370a6eba988f810e817b2119996b46a22f57f165195ead0fd69dd20dd5ccbf209eaaea15ecd769979283a7d075e3c978c184ddb9080229d59190970c383"' : 'data-bs-target="#xs-injectables-links-module-HubModule-40916370a6eba988f810e817b2119996b46a22f57f165195ead0fd69dd20dd5ccbf209eaaea15ecd769979283a7d075e3c978c184ddb9080229d59190970c383"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-HubModule-40916370a6eba988f810e817b2119996b46a22f57f165195ead0fd69dd20dd5ccbf209eaaea15ecd769979283a7d075e3c978c184ddb9080229d59190970c383"' :
                                        'id="xs-injectables-links-module-HubModule-40916370a6eba988f810e817b2119996b46a22f57f165195ead0fd69dd20dd5ccbf209eaaea15ecd769979283a7d075e3c978c184ddb9080229d59190970c383"' }>
                                        <li class="link">
                                            <a href="injectables/AppConfigService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppConfigService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/HubAggregateFactory.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HubAggregateFactory</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/HubAggregatePersistanceACL.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HubAggregatePersistanceACL</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/HubCommandRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HubCommandRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/HubQueryRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HubQueryRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/HubService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HubService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PersistanceService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PersistanceService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LikesConsumerModule.html" data-type="entity-link" >LikesConsumerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-LikesConsumerModule-9a23e603c899a69c4ace31d87928931bc542fcc02bd40fd40e0bd67f009914f126746b74bbae1ef89367790f4a2b7b5791a7bdd6b5719aed8a262156be66fca6"' : 'data-bs-target="#xs-controllers-links-module-LikesConsumerModule-9a23e603c899a69c4ace31d87928931bc542fcc02bd40fd40e0bd67f009914f126746b74bbae1ef89367790f4a2b7b5791a7bdd6b5719aed8a262156be66fca6"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-LikesConsumerModule-9a23e603c899a69c4ace31d87928931bc542fcc02bd40fd40e0bd67f009914f126746b74bbae1ef89367790f4a2b7b5791a7bdd6b5719aed8a262156be66fca6"' :
                                            'id="xs-controllers-links-module-LikesConsumerModule-9a23e603c899a69c4ace31d87928931bc542fcc02bd40fd40e0bd67f009914f126746b74bbae1ef89367790f4a2b7b5791a7bdd6b5719aed8a262156be66fca6"' }>
                                            <li class="link">
                                                <a href="controllers/LikesConsumerController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LikesConsumerController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-LikesConsumerModule-9a23e603c899a69c4ace31d87928931bc542fcc02bd40fd40e0bd67f009914f126746b74bbae1ef89367790f4a2b7b5791a7bdd6b5719aed8a262156be66fca6"' : 'data-bs-target="#xs-injectables-links-module-LikesConsumerModule-9a23e603c899a69c4ace31d87928931bc542fcc02bd40fd40e0bd67f009914f126746b74bbae1ef89367790f4a2b7b5791a7bdd6b5719aed8a262156be66fca6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LikesConsumerModule-9a23e603c899a69c4ace31d87928931bc542fcc02bd40fd40e0bd67f009914f126746b74bbae1ef89367790f4a2b7b5791a7bdd6b5719aed8a262156be66fca6"' :
                                        'id="xs-injectables-links-module-LikesConsumerModule-9a23e603c899a69c4ace31d87928931bc542fcc02bd40fd40e0bd67f009914f126746b74bbae1ef89367790f4a2b7b5791a7bdd6b5719aed8a262156be66fca6"' }>
                                        <li class="link">
                                            <a href="injectables/AppConfigService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppConfigService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LikeAggregateFactory.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LikeAggregateFactory</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LikePersistanceACL.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LikePersistanceACL</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LikeRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LikeRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LikesConsumerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LikesConsumerService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LikesModule.html" data-type="entity-link" >LikesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-LikesModule-1f0ddd1b1a4326b4a203163a826848a95745b121c99e49bcde1db7d65082adeb78eabae8d039e1a2711a3193be112c8e106e9c002f9b7bd2cf6991cbdd39d9de"' : 'data-bs-target="#xs-controllers-links-module-LikesModule-1f0ddd1b1a4326b4a203163a826848a95745b121c99e49bcde1db7d65082adeb78eabae8d039e1a2711a3193be112c8e106e9c002f9b7bd2cf6991cbdd39d9de"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-LikesModule-1f0ddd1b1a4326b4a203163a826848a95745b121c99e49bcde1db7d65082adeb78eabae8d039e1a2711a3193be112c8e106e9c002f9b7bd2cf6991cbdd39d9de"' :
                                            'id="xs-controllers-links-module-LikesModule-1f0ddd1b1a4326b4a203163a826848a95745b121c99e49bcde1db7d65082adeb78eabae8d039e1a2711a3193be112c8e106e9c002f9b7bd2cf6991cbdd39d9de"' }>
                                            <li class="link">
                                                <a href="controllers/LikesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LikesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-LikesModule-1f0ddd1b1a4326b4a203163a826848a95745b121c99e49bcde1db7d65082adeb78eabae8d039e1a2711a3193be112c8e106e9c002f9b7bd2cf6991cbdd39d9de"' : 'data-bs-target="#xs-injectables-links-module-LikesModule-1f0ddd1b1a4326b4a203163a826848a95745b121c99e49bcde1db7d65082adeb78eabae8d039e1a2711a3193be112c8e106e9c002f9b7bd2cf6991cbdd39d9de"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LikesModule-1f0ddd1b1a4326b4a203163a826848a95745b121c99e49bcde1db7d65082adeb78eabae8d039e1a2711a3193be112c8e106e9c002f9b7bd2cf6991cbdd39d9de"' :
                                        'id="xs-injectables-links-module-LikesModule-1f0ddd1b1a4326b4a203163a826848a95745b121c99e49bcde1db7d65082adeb78eabae8d039e1a2711a3193be112c8e106e9c002f9b7bd2cf6991cbdd39d9de"' }>
                                        <li class="link">
                                            <a href="injectables/LikesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LikesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LikesModule.html" data-type="entity-link" >LikesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-LikesModule-93edda0453bdfffb685b91c98f7de63df7f66a8dc4a2ccf030c0566f7dec5d779813509a7e3e68d76d978ebc451761668b1734612184377a71f4ff9ef791835a-1"' : 'data-bs-target="#xs-controllers-links-module-LikesModule-93edda0453bdfffb685b91c98f7de63df7f66a8dc4a2ccf030c0566f7dec5d779813509a7e3e68d76d978ebc451761668b1734612184377a71f4ff9ef791835a-1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-LikesModule-93edda0453bdfffb685b91c98f7de63df7f66a8dc4a2ccf030c0566f7dec5d779813509a7e3e68d76d978ebc451761668b1734612184377a71f4ff9ef791835a-1"' :
                                            'id="xs-controllers-links-module-LikesModule-93edda0453bdfffb685b91c98f7de63df7f66a8dc4a2ccf030c0566f7dec5d779813509a7e3e68d76d978ebc451761668b1734612184377a71f4ff9ef791835a-1"' }>
                                            <li class="link">
                                                <a href="controllers/LikesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LikesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-LikesModule-93edda0453bdfffb685b91c98f7de63df7f66a8dc4a2ccf030c0566f7dec5d779813509a7e3e68d76d978ebc451761668b1734612184377a71f4ff9ef791835a-1"' : 'data-bs-target="#xs-injectables-links-module-LikesModule-93edda0453bdfffb685b91c98f7de63df7f66a8dc4a2ccf030c0566f7dec5d779813509a7e3e68d76d978ebc451761668b1734612184377a71f4ff9ef791835a-1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LikesModule-93edda0453bdfffb685b91c98f7de63df7f66a8dc4a2ccf030c0566f7dec5d779813509a7e3e68d76d978ebc451761668b1734612184377a71f4ff9ef791835a-1"' :
                                        'id="xs-injectables-links-module-LikesModule-93edda0453bdfffb685b91c98f7de63df7f66a8dc4a2ccf030c0566f7dec5d779813509a7e3e68d76d978ebc451761668b1734612184377a71f4ff9ef791835a-1"' }>
                                        <li class="link">
                                            <a href="injectables/AppConfigService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppConfigService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LikeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LikeService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LogsModule.html" data-type="entity-link" >LogsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LogsModule.html" data-type="entity-link" >LogsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LogsModule.html" data-type="entity-link" >LogsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LogsModule.html" data-type="entity-link" >LogsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LogsModule.html" data-type="entity-link" >LogsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LogsModule.html" data-type="entity-link" >LogsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LogsModule.html" data-type="entity-link" >LogsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LogsModule.html" data-type="entity-link" >LogsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LogsModule.html" data-type="entity-link" >LogsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LogsModule.html" data-type="entity-link" >LogsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MeasureModule.html" data-type="entity-link" >MeasureModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MeasureModule.html" data-type="entity-link" >MeasureModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MeasureModule.html" data-type="entity-link" >MeasureModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MeasureModule.html" data-type="entity-link" >MeasureModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MeasureModule.html" data-type="entity-link" >MeasureModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MeasureModule.html" data-type="entity-link" >MeasureModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MessageBrokerModule.html" data-type="entity-link" >MessageBrokerModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MessageBrokerModule-5620bdd48ca4ab0487de90e28100ef52a8616cd915492120149c85ecbb6b928c62725100d1a9d81536d8dc0664e0c990baea1d6ca6ac072417affd3cb87a3bff"' : 'data-bs-target="#xs-injectables-links-module-MessageBrokerModule-5620bdd48ca4ab0487de90e28100ef52a8616cd915492120149c85ecbb6b928c62725100d1a9d81536d8dc0664e0c990baea1d6ca6ac072417affd3cb87a3bff"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MessageBrokerModule-5620bdd48ca4ab0487de90e28100ef52a8616cd915492120149c85ecbb6b928c62725100d1a9d81536d8dc0664e0c990baea1d6ca6ac072417affd3cb87a3bff"' :
                                        'id="xs-injectables-links-module-MessageBrokerModule-5620bdd48ca4ab0487de90e28100ef52a8616cd915492120149c85ecbb6b928c62725100d1a9d81536d8dc0664e0c990baea1d6ca6ac072417affd3cb87a3bff"' }>
                                        <li class="link">
                                            <a href="injectables/AppConfigService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppConfigService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MessageBrokerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MessageBrokerService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PersistanceModule.html" data-type="entity-link" >PersistanceModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PersistanceModule-713c0622bbc6ed4ab3b3a18ded15ec1318001b98c3e73e7a65bb0b84986ad41e96c7f0f3384abe1c98877fb1afae90c5a9200d642740bcaf15074db40ba48cbb"' : 'data-bs-target="#xs-injectables-links-module-PersistanceModule-713c0622bbc6ed4ab3b3a18ded15ec1318001b98c3e73e7a65bb0b84986ad41e96c7f0f3384abe1c98877fb1afae90c5a9200d642740bcaf15074db40ba48cbb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PersistanceModule-713c0622bbc6ed4ab3b3a18ded15ec1318001b98c3e73e7a65bb0b84986ad41e96c7f0f3384abe1c98877fb1afae90c5a9200d642740bcaf15074db40ba48cbb"' :
                                        'id="xs-injectables-links-module-PersistanceModule-713c0622bbc6ed4ab3b3a18ded15ec1318001b98c3e73e7a65bb0b84986ad41e96c7f0f3384abe1c98877fb1afae90c5a9200d642740bcaf15074db40ba48cbb"' }>
                                        <li class="link">
                                            <a href="injectables/PersistanceService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PersistanceService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PersistanceModule.html" data-type="entity-link" >PersistanceModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PersistanceModule-8679c801067554e5fbf2330e9c4a7a1079ebe97aa1185c4ef6726988f5f41ede396aa3f13a4ac0b25dce1e2776f1dc2bb868344eddf9dc0df7d4ebd3e955576e-1"' : 'data-bs-target="#xs-injectables-links-module-PersistanceModule-8679c801067554e5fbf2330e9c4a7a1079ebe97aa1185c4ef6726988f5f41ede396aa3f13a4ac0b25dce1e2776f1dc2bb868344eddf9dc0df7d4ebd3e955576e-1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PersistanceModule-8679c801067554e5fbf2330e9c4a7a1079ebe97aa1185c4ef6726988f5f41ede396aa3f13a4ac0b25dce1e2776f1dc2bb868344eddf9dc0df7d4ebd3e955576e-1"' :
                                        'id="xs-injectables-links-module-PersistanceModule-8679c801067554e5fbf2330e9c4a7a1079ebe97aa1185c4ef6726988f5f41ede396aa3f13a4ac0b25dce1e2776f1dc2bb868344eddf9dc0df7d4ebd3e955576e-1"' }>
                                        <li class="link">
                                            <a href="injectables/PersistanceService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PersistanceService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PersistanceModule.html" data-type="entity-link" >PersistanceModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PersistanceModule-3bec8eaba594daa728d5535232827b609ad8d2fba92aa3864f4a529cacbb0d52332cb0a729be3d49cee648977502edb40d4685e03de2ef850aa81a443fb3f84e-2"' : 'data-bs-target="#xs-injectables-links-module-PersistanceModule-3bec8eaba594daa728d5535232827b609ad8d2fba92aa3864f4a529cacbb0d52332cb0a729be3d49cee648977502edb40d4685e03de2ef850aa81a443fb3f84e-2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PersistanceModule-3bec8eaba594daa728d5535232827b609ad8d2fba92aa3864f4a529cacbb0d52332cb0a729be3d49cee648977502edb40d4685e03de2ef850aa81a443fb3f84e-2"' :
                                        'id="xs-injectables-links-module-PersistanceModule-3bec8eaba594daa728d5535232827b609ad8d2fba92aa3864f4a529cacbb0d52332cb0a729be3d49cee648977502edb40d4685e03de2ef850aa81a443fb3f84e-2"' }>
                                        <li class="link">
                                            <a href="injectables/AppConfigService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppConfigService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PersistanceService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PersistanceService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PersistanceModule.html" data-type="entity-link" >PersistanceModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PersistanceModule-6f098c38e50c1b6873f0f4f80562abac3e278b87f22c24b181d034d775302eac39ad9e3fa737903cf0e0dd7de71aecca794867b56f1f79e62ae4e8959e1c4bd2-3"' : 'data-bs-target="#xs-injectables-links-module-PersistanceModule-6f098c38e50c1b6873f0f4f80562abac3e278b87f22c24b181d034d775302eac39ad9e3fa737903cf0e0dd7de71aecca794867b56f1f79e62ae4e8959e1c4bd2-3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PersistanceModule-6f098c38e50c1b6873f0f4f80562abac3e278b87f22c24b181d034d775302eac39ad9e3fa737903cf0e0dd7de71aecca794867b56f1f79e62ae4e8959e1c4bd2-3"' :
                                        'id="xs-injectables-links-module-PersistanceModule-6f098c38e50c1b6873f0f4f80562abac3e278b87f22c24b181d034d775302eac39ad9e3fa737903cf0e0dd7de71aecca794867b56f1f79e62ae4e8959e1c4bd2-3"' }>
                                        <li class="link">
                                            <a href="injectables/PersistanceService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PersistanceService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PersistanceModule.html" data-type="entity-link" >PersistanceModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PersistanceModule-852af84096b1adcc4315e7c6b664aeccb0a66a0c6489dccd595aaa4c0fa62a1dd48a0c5154969193327bd9bda3d2a2e3b157ac59baeccc76e4c559531778e63c-4"' : 'data-bs-target="#xs-injectables-links-module-PersistanceModule-852af84096b1adcc4315e7c6b664aeccb0a66a0c6489dccd595aaa4c0fa62a1dd48a0c5154969193327bd9bda3d2a2e3b157ac59baeccc76e4c559531778e63c-4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PersistanceModule-852af84096b1adcc4315e7c6b664aeccb0a66a0c6489dccd595aaa4c0fa62a1dd48a0c5154969193327bd9bda3d2a2e3b157ac59baeccc76e4c559531778e63c-4"' :
                                        'id="xs-injectables-links-module-PersistanceModule-852af84096b1adcc4315e7c6b664aeccb0a66a0c6489dccd595aaa4c0fa62a1dd48a0c5154969193327bd9bda3d2a2e3b157ac59baeccc76e4c559531778e63c-4"' }>
                                        <li class="link">
                                            <a href="injectables/PersistanceService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PersistanceService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PersistanceModule.html" data-type="entity-link" >PersistanceModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PersistanceModule-f36ef6c184ef8248b33fc14ec67cdb6759a4089e10469a30f700739c87c9311354648adfbfc1644adcbf79ace82b6469e4c9c9606037d38e0e7e6e77b816a456-5"' : 'data-bs-target="#xs-injectables-links-module-PersistanceModule-f36ef6c184ef8248b33fc14ec67cdb6759a4089e10469a30f700739c87c9311354648adfbfc1644adcbf79ace82b6469e4c9c9606037d38e0e7e6e77b816a456-5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PersistanceModule-f36ef6c184ef8248b33fc14ec67cdb6759a4089e10469a30f700739c87c9311354648adfbfc1644adcbf79ace82b6469e4c9c9606037d38e0e7e6e77b816a456-5"' :
                                        'id="xs-injectables-links-module-PersistanceModule-f36ef6c184ef8248b33fc14ec67cdb6759a4089e10469a30f700739c87c9311354648adfbfc1644adcbf79ace82b6469e4c9c9606037d38e0e7e6e77b816a456-5"' }>
                                        <li class="link">
                                            <a href="injectables/PersistanceService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PersistanceService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SagaModule.html" data-type="entity-link" >SagaModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SagaModule-80e12d0b19c2d98153677236148e911632079bfbb00240aaa22521551656d781c12216dbb6520ff1f5f26e9ad7b28bb76d78cab6b0eacc820eacf38e236c90ff"' : 'data-bs-target="#xs-controllers-links-module-SagaModule-80e12d0b19c2d98153677236148e911632079bfbb00240aaa22521551656d781c12216dbb6520ff1f5f26e9ad7b28bb76d78cab6b0eacc820eacf38e236c90ff"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SagaModule-80e12d0b19c2d98153677236148e911632079bfbb00240aaa22521551656d781c12216dbb6520ff1f5f26e9ad7b28bb76d78cab6b0eacc820eacf38e236c90ff"' :
                                            'id="xs-controllers-links-module-SagaModule-80e12d0b19c2d98153677236148e911632079bfbb00240aaa22521551656d781c12216dbb6520ff1f5f26e9ad7b28bb76d78cab6b0eacc820eacf38e236c90ff"' }>
                                            <li class="link">
                                                <a href="controllers/SagaController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SagaController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SagaModule-80e12d0b19c2d98153677236148e911632079bfbb00240aaa22521551656d781c12216dbb6520ff1f5f26e9ad7b28bb76d78cab6b0eacc820eacf38e236c90ff"' : 'data-bs-target="#xs-injectables-links-module-SagaModule-80e12d0b19c2d98153677236148e911632079bfbb00240aaa22521551656d781c12216dbb6520ff1f5f26e9ad7b28bb76d78cab6b0eacc820eacf38e236c90ff"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SagaModule-80e12d0b19c2d98153677236148e911632079bfbb00240aaa22521551656d781c12216dbb6520ff1f5f26e9ad7b28bb76d78cab6b0eacc820eacf38e236c90ff"' :
                                        'id="xs-injectables-links-module-SagaModule-80e12d0b19c2d98153677236148e911632079bfbb00240aaa22521551656d781c12216dbb6520ff1f5f26e9ad7b28bb76d78cab6b0eacc820eacf38e236c90ff"' }>
                                        <li class="link">
                                            <a href="injectables/SagaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SagaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StorageModule.html" data-type="entity-link" >StorageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-StorageModule-3922809fccc53bf66fc4f457e3b0e6ab0e203fac5442479ae6c48eaa3a96ecc6ef5f101f877129728c624d3280147fa26f81d1e0be42aa21edba03f700e2dd12"' : 'data-bs-target="#xs-controllers-links-module-StorageModule-3922809fccc53bf66fc4f457e3b0e6ab0e203fac5442479ae6c48eaa3a96ecc6ef5f101f877129728c624d3280147fa26f81d1e0be42aa21edba03f700e2dd12"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-StorageModule-3922809fccc53bf66fc4f457e3b0e6ab0e203fac5442479ae6c48eaa3a96ecc6ef5f101f877129728c624d3280147fa26f81d1e0be42aa21edba03f700e2dd12"' :
                                            'id="xs-controllers-links-module-StorageModule-3922809fccc53bf66fc4f457e3b0e6ab0e203fac5442479ae6c48eaa3a96ecc6ef5f101f877129728c624d3280147fa26f81d1e0be42aa21edba03f700e2dd12"' }>
                                            <li class="link">
                                                <a href="controllers/StorageController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StorageController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-StorageModule-3922809fccc53bf66fc4f457e3b0e6ab0e203fac5442479ae6c48eaa3a96ecc6ef5f101f877129728c624d3280147fa26f81d1e0be42aa21edba03f700e2dd12"' : 'data-bs-target="#xs-injectables-links-module-StorageModule-3922809fccc53bf66fc4f457e3b0e6ab0e203fac5442479ae6c48eaa3a96ecc6ef5f101f877129728c624d3280147fa26f81d1e0be42aa21edba03f700e2dd12"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StorageModule-3922809fccc53bf66fc4f457e3b0e6ab0e203fac5442479ae6c48eaa3a96ecc6ef5f101f877129728c624d3280147fa26f81d1e0be42aa21edba03f700e2dd12"' :
                                        'id="xs-injectables-links-module-StorageModule-3922809fccc53bf66fc4f457e3b0e6ab0e203fac5442479ae6c48eaa3a96ecc6ef5f101f877129728c624d3280147fa26f81d1e0be42aa21edba03f700e2dd12"' }>
                                        <li class="link">
                                            <a href="injectables/AwsS3StorageAdapter.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AwsS3StorageAdapter</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CloudinaryStorageAdapter.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CloudinaryStorageAdapter</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GCPStorageAdapter.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GCPStorageAdapter</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StorageAdapter.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StorageAdapter</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StorageService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StorageService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserModule-f7aa33edab40c6f9b3b61c41ece3ad199378ee7950604d00b590773ee8e84f24fc4ae5b446dc13e3d0712b87289ee3965b03cca08155ea90934b305cbf9c4eef"' : 'data-bs-target="#xs-controllers-links-module-UserModule-f7aa33edab40c6f9b3b61c41ece3ad199378ee7950604d00b590773ee8e84f24fc4ae5b446dc13e3d0712b87289ee3965b03cca08155ea90934b305cbf9c4eef"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-f7aa33edab40c6f9b3b61c41ece3ad199378ee7950604d00b590773ee8e84f24fc4ae5b446dc13e3d0712b87289ee3965b03cca08155ea90934b305cbf9c4eef"' :
                                            'id="xs-controllers-links-module-UserModule-f7aa33edab40c6f9b3b61c41ece3ad199378ee7950604d00b590773ee8e84f24fc4ae5b446dc13e3d0712b87289ee3965b03cca08155ea90934b305cbf9c4eef"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-f7aa33edab40c6f9b3b61c41ece3ad199378ee7950604d00b590773ee8e84f24fc4ae5b446dc13e3d0712b87289ee3965b03cca08155ea90934b305cbf9c4eef"' : 'data-bs-target="#xs-injectables-links-module-UserModule-f7aa33edab40c6f9b3b61c41ece3ad199378ee7950604d00b590773ee8e84f24fc4ae5b446dc13e3d0712b87289ee3965b03cca08155ea90934b305cbf9c4eef"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-f7aa33edab40c6f9b3b61c41ece3ad199378ee7950604d00b590773ee8e84f24fc4ae5b446dc13e3d0712b87289ee3965b03cca08155ea90934b305cbf9c4eef"' :
                                        'id="xs-injectables-links-module-UserModule-f7aa33edab40c6f9b3b61c41ece3ad199378ee7950604d00b590773ee8e84f24fc4ae5b446dc13e3d0712b87289ee3965b03cca08155ea90934b305cbf9c4eef"' }>
                                        <li class="link">
                                            <a href="injectables/AppConfigService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppConfigService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PersistanceService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PersistanceService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserAggregatePersistanceACL.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserAggregatePersistanceACL</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserCommandRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserCommandRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserQueryRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserQueryRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-cac3949a28ed269b26e715edf65f2f3a67f9310194155e3aed527d58c7169fdba194ce6ba8935177139fff5a7f8e9939027b36d12ae86bed3aa865bbab3bf494"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-cac3949a28ed269b26e715edf65f2f3a67f9310194155e3aed527d58c7169fdba194ce6ba8935177139fff5a7f8e9939027b36d12ae86bed3aa865bbab3bf494"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-cac3949a28ed269b26e715edf65f2f3a67f9310194155e3aed527d58c7169fdba194ce6ba8935177139fff5a7f8e9939027b36d12ae86bed3aa865bbab3bf494"' :
                                            'id="xs-controllers-links-module-UsersModule-cac3949a28ed269b26e715edf65f2f3a67f9310194155e3aed527d58c7169fdba194ce6ba8935177139fff5a7f8e9939027b36d12ae86bed3aa865bbab3bf494"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/VideoCacheModule.html" data-type="entity-link" >VideoCacheModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-VideoCacheModule-9337df7f020f961e655d5593e63ba0ba5f995419fec2cdbbaf38afdc505b22a8bcf240800c9e17a8b2f26a7c7ea407fca31811246e0028702206176efe578b31"' : 'data-bs-target="#xs-injectables-links-module-VideoCacheModule-9337df7f020f961e655d5593e63ba0ba5f995419fec2cdbbaf38afdc505b22a8bcf240800c9e17a8b2f26a7c7ea407fca31811246e0028702206176efe578b31"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-VideoCacheModule-9337df7f020f961e655d5593e63ba0ba5f995419fec2cdbbaf38afdc505b22a8bcf240800c9e17a8b2f26a7c7ea407fca31811246e0028702206176efe578b31"' :
                                        'id="xs-injectables-links-module-VideoCacheModule-9337df7f020f961e655d5593e63ba0ba5f995419fec2cdbbaf38afdc505b22a8bcf240800c9e17a8b2f26a7c7ea407fca31811246e0028702206176efe578b31"' }>
                                        <li class="link">
                                            <a href="injectables/VideoCacheService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VideoCacheService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/VideoModule.html" data-type="entity-link" >VideoModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-VideoModule-7ebe3ae53fc84c5622080c38fba3828b20f85810591226c20dfb264182d1985200972e9d1363c54c3925b44f80041f50a8025a60758e811a2b1b271a2b3db54f"' : 'data-bs-target="#xs-controllers-links-module-VideoModule-7ebe3ae53fc84c5622080c38fba3828b20f85810591226c20dfb264182d1985200972e9d1363c54c3925b44f80041f50a8025a60758e811a2b1b271a2b3db54f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-VideoModule-7ebe3ae53fc84c5622080c38fba3828b20f85810591226c20dfb264182d1985200972e9d1363c54c3925b44f80041f50a8025a60758e811a2b1b271a2b3db54f"' :
                                            'id="xs-controllers-links-module-VideoModule-7ebe3ae53fc84c5622080c38fba3828b20f85810591226c20dfb264182d1985200972e9d1363c54c3925b44f80041f50a8025a60758e811a2b1b271a2b3db54f"' }>
                                            <li class="link">
                                                <a href="controllers/VideoController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VideoController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-VideoModule-7ebe3ae53fc84c5622080c38fba3828b20f85810591226c20dfb264182d1985200972e9d1363c54c3925b44f80041f50a8025a60758e811a2b1b271a2b3db54f"' : 'data-bs-target="#xs-injectables-links-module-VideoModule-7ebe3ae53fc84c5622080c38fba3828b20f85810591226c20dfb264182d1985200972e9d1363c54c3925b44f80041f50a8025a60758e811a2b1b271a2b3db54f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-VideoModule-7ebe3ae53fc84c5622080c38fba3828b20f85810591226c20dfb264182d1985200972e9d1363c54c3925b44f80041f50a8025a60758e811a2b1b271a2b3db54f"' :
                                        'id="xs-injectables-links-module-VideoModule-7ebe3ae53fc84c5622080c38fba3828b20f85810591226c20dfb264182d1985200972e9d1363c54c3925b44f80041f50a8025a60758e811a2b1b271a2b3db54f"' }>
                                        <li class="link">
                                            <a href="injectables/VideoService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VideoService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/VideosModule.html" data-type="entity-link" >VideosModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-VideosModule-1da7ad9e27f2c7321ee945ebc729c7056664cef5c485d715328ec440c1f646f845423e431ce55fca9a1952443951f4d803bcbbd975f9f87b3860519d729319da"' : 'data-bs-target="#xs-controllers-links-module-VideosModule-1da7ad9e27f2c7321ee945ebc729c7056664cef5c485d715328ec440c1f646f845423e431ce55fca9a1952443951f4d803bcbbd975f9f87b3860519d729319da"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-VideosModule-1da7ad9e27f2c7321ee945ebc729c7056664cef5c485d715328ec440c1f646f845423e431ce55fca9a1952443951f4d803bcbbd975f9f87b3860519d729319da"' :
                                            'id="xs-controllers-links-module-VideosModule-1da7ad9e27f2c7321ee945ebc729c7056664cef5c485d715328ec440c1f646f845423e431ce55fca9a1952443951f4d803bcbbd975f9f87b3860519d729319da"' }>
                                            <li class="link">
                                                <a href="controllers/VideosController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VideosController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-VideosModule-1da7ad9e27f2c7321ee945ebc729c7056664cef5c485d715328ec440c1f646f845423e431ce55fca9a1952443951f4d803bcbbd975f9f87b3860519d729319da"' : 'data-bs-target="#xs-injectables-links-module-VideosModule-1da7ad9e27f2c7321ee945ebc729c7056664cef5c485d715328ec440c1f646f845423e431ce55fca9a1952443951f4d803bcbbd975f9f87b3860519d729319da"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-VideosModule-1da7ad9e27f2c7321ee945ebc729c7056664cef5c485d715328ec440c1f646f845423e431ce55fca9a1952443951f4d803bcbbd975f9f87b3860519d729319da"' :
                                        'id="xs-injectables-links-module-VideosModule-1da7ad9e27f2c7321ee945ebc729c7056664cef5c485d715328ec440c1f646f845423e431ce55fca9a1952443951f4d803bcbbd975f9f87b3860519d729319da"' }>
                                        <li class="link">
                                            <a href="injectables/QueryModelResponseMapper.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >QueryModelResponseMapper</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/VideoAggregateFactory.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VideoAggregateFactory</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/VideoAggregatePersistanceACL.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VideoAggregatePersistanceACL</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/VideoCommandRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VideoCommandRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/VideoQueryRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VideoQueryRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/VideosService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VideosService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/VideoTranscoderModule.html" data-type="entity-link" >VideoTranscoderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-VideoTranscoderModule-5cff788b83ab54ef409ecc3100ee0c4eafcc6bbaf14e97700f6bf57d3d11213f285778f037e19daf4b33218f135109b6862696bf8a42f790279ba94e44c7dd5b"' : 'data-bs-target="#xs-controllers-links-module-VideoTranscoderModule-5cff788b83ab54ef409ecc3100ee0c4eafcc6bbaf14e97700f6bf57d3d11213f285778f037e19daf4b33218f135109b6862696bf8a42f790279ba94e44c7dd5b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-VideoTranscoderModule-5cff788b83ab54ef409ecc3100ee0c4eafcc6bbaf14e97700f6bf57d3d11213f285778f037e19daf4b33218f135109b6862696bf8a42f790279ba94e44c7dd5b"' :
                                            'id="xs-controllers-links-module-VideoTranscoderModule-5cff788b83ab54ef409ecc3100ee0c4eafcc6bbaf14e97700f6bf57d3d11213f285778f037e19daf4b33218f135109b6862696bf8a42f790279ba94e44c7dd5b"' }>
                                            <li class="link">
                                                <a href="controllers/VideoTranscoderController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VideoTranscoderController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-VideoTranscoderModule-5cff788b83ab54ef409ecc3100ee0c4eafcc6bbaf14e97700f6bf57d3d11213f285778f037e19daf4b33218f135109b6862696bf8a42f790279ba94e44c7dd5b"' : 'data-bs-target="#xs-injectables-links-module-VideoTranscoderModule-5cff788b83ab54ef409ecc3100ee0c4eafcc6bbaf14e97700f6bf57d3d11213f285778f037e19daf4b33218f135109b6862696bf8a42f790279ba94e44c7dd5b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-VideoTranscoderModule-5cff788b83ab54ef409ecc3100ee0c4eafcc6bbaf14e97700f6bf57d3d11213f285778f037e19daf4b33218f135109b6862696bf8a42f790279ba94e44c7dd5b"' :
                                        'id="xs-injectables-links-module-VideoTranscoderModule-5cff788b83ab54ef409ecc3100ee0c4eafcc6bbaf14e97700f6bf57d3d11213f285778f037e19daf4b33218f135109b6862696bf8a42f790279ba94e44c7dd5b"' }>
                                        <li class="link">
                                            <a href="injectables/VideoTranscoderService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VideoTranscoderService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ViewAggregatorCacheModule.html" data-type="entity-link" >ViewAggregatorCacheModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ViewAggregatorCacheModule-0103741806f7f7a71f96b508e623603bfc2f1126cb6729434f8a6deb221244d063f570cb9487bbb9c57d883cd884ee57f7880cfedd28bfe244cca86dc1c4ed23"' : 'data-bs-target="#xs-injectables-links-module-ViewAggregatorCacheModule-0103741806f7f7a71f96b508e623603bfc2f1126cb6729434f8a6deb221244d063f570cb9487bbb9c57d883cd884ee57f7880cfedd28bfe244cca86dc1c4ed23"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ViewAggregatorCacheModule-0103741806f7f7a71f96b508e623603bfc2f1126cb6729434f8a6deb221244d063f570cb9487bbb9c57d883cd884ee57f7880cfedd28bfe244cca86dc1c4ed23"' :
                                        'id="xs-injectables-links-module-ViewAggregatorCacheModule-0103741806f7f7a71f96b508e623603bfc2f1126cb6729434f8a6deb221244d063f570cb9487bbb9c57d883cd884ee57f7880cfedd28bfe244cca86dc1c4ed23"' }>
                                        <li class="link">
                                            <a href="injectables/ViewAggregateFactory.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewAggregateFactory</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ViewAggregatorCacheService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewAggregatorCacheService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ViewPeristanceAggregateACL.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewPeristanceAggregateACL</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ViewRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewRepository</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ViewsCacheModule.html" data-type="entity-link" >ViewsCacheModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ViewsCacheModule-8f4c2ea789c4694a558c2ade6180e6de44a44c1a315c63740b142eb08837832bf6e7366826f1b3964644ee37f2f8d3adaacbef5ddf626a486a89dd4055c0441d"' : 'data-bs-target="#xs-injectables-links-module-ViewsCacheModule-8f4c2ea789c4694a558c2ade6180e6de44a44c1a315c63740b142eb08837832bf6e7366826f1b3964644ee37f2f8d3adaacbef5ddf626a486a89dd4055c0441d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ViewsCacheModule-8f4c2ea789c4694a558c2ade6180e6de44a44c1a315c63740b142eb08837832bf6e7366826f1b3964644ee37f2f8d3adaacbef5ddf626a486a89dd4055c0441d"' :
                                        'id="xs-injectables-links-module-ViewsCacheModule-8f4c2ea789c4694a558c2ade6180e6de44a44c1a315c63740b142eb08837832bf6e7366826f1b3964644ee37f2f8d3adaacbef5ddf626a486a89dd4055c0441d"' }>
                                        <li class="link">
                                            <a href="injectables/ViewsCacheService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewsCacheService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ViewsConsumerModule.html" data-type="entity-link" >ViewsConsumerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ViewsConsumerModule-8be07ff55e4469c643ce3d7f4d9d1262463b3719ebfdef94d2ff6b27fc2b3b553053f364a1f59e30b9510ad4d2235a6fe51417fce21c684061f173b596aa8d3e"' : 'data-bs-target="#xs-controllers-links-module-ViewsConsumerModule-8be07ff55e4469c643ce3d7f4d9d1262463b3719ebfdef94d2ff6b27fc2b3b553053f364a1f59e30b9510ad4d2235a6fe51417fce21c684061f173b596aa8d3e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ViewsConsumerModule-8be07ff55e4469c643ce3d7f4d9d1262463b3719ebfdef94d2ff6b27fc2b3b553053f364a1f59e30b9510ad4d2235a6fe51417fce21c684061f173b596aa8d3e"' :
                                            'id="xs-controllers-links-module-ViewsConsumerModule-8be07ff55e4469c643ce3d7f4d9d1262463b3719ebfdef94d2ff6b27fc2b3b553053f364a1f59e30b9510ad4d2235a6fe51417fce21c684061f173b596aa8d3e"' }>
                                            <li class="link">
                                                <a href="controllers/ViewsConsumerController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewsConsumerController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ViewsConsumerModule-8be07ff55e4469c643ce3d7f4d9d1262463b3719ebfdef94d2ff6b27fc2b3b553053f364a1f59e30b9510ad4d2235a6fe51417fce21c684061f173b596aa8d3e"' : 'data-bs-target="#xs-injectables-links-module-ViewsConsumerModule-8be07ff55e4469c643ce3d7f4d9d1262463b3719ebfdef94d2ff6b27fc2b3b553053f364a1f59e30b9510ad4d2235a6fe51417fce21c684061f173b596aa8d3e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ViewsConsumerModule-8be07ff55e4469c643ce3d7f4d9d1262463b3719ebfdef94d2ff6b27fc2b3b553053f364a1f59e30b9510ad4d2235a6fe51417fce21c684061f173b596aa8d3e"' :
                                        'id="xs-injectables-links-module-ViewsConsumerModule-8be07ff55e4469c643ce3d7f4d9d1262463b3719ebfdef94d2ff6b27fc2b3b553053f364a1f59e30b9510ad4d2235a6fe51417fce21c684061f173b596aa8d3e"' }>
                                        <li class="link">
                                            <a href="injectables/AppConfigService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppConfigService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ViewAggregateFactory.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewAggregateFactory</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ViewPeristanceAggregateACL.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewPeristanceAggregateACL</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ViewRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ViewsConsumerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewsConsumerService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/WatchModule.html" data-type="entity-link" >WatchModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-WatchModule-5ab5bdee167ff2053d958740f7b104f55f945c1b12fac94ce74ee9c3a7e80a504e0fda6dce989c0a998b8bf3bc76fe0b9a0348a5d1312e37896f4625d846a58c"' : 'data-bs-target="#xs-controllers-links-module-WatchModule-5ab5bdee167ff2053d958740f7b104f55f945c1b12fac94ce74ee9c3a7e80a504e0fda6dce989c0a998b8bf3bc76fe0b9a0348a5d1312e37896f4625d846a58c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-WatchModule-5ab5bdee167ff2053d958740f7b104f55f945c1b12fac94ce74ee9c3a7e80a504e0fda6dce989c0a998b8bf3bc76fe0b9a0348a5d1312e37896f4625d846a58c"' :
                                            'id="xs-controllers-links-module-WatchModule-5ab5bdee167ff2053d958740f7b104f55f945c1b12fac94ce74ee9c3a7e80a504e0fda6dce989c0a998b8bf3bc76fe0b9a0348a5d1312e37896f4625d846a58c"' }>
                                            <li class="link">
                                                <a href="controllers/WatchController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WatchController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-WatchModule-5ab5bdee167ff2053d958740f7b104f55f945c1b12fac94ce74ee9c3a7e80a504e0fda6dce989c0a998b8bf3bc76fe0b9a0348a5d1312e37896f4625d846a58c"' : 'data-bs-target="#xs-injectables-links-module-WatchModule-5ab5bdee167ff2053d958740f7b104f55f945c1b12fac94ce74ee9c3a7e80a504e0fda6dce989c0a998b8bf3bc76fe0b9a0348a5d1312e37896f4625d846a58c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-WatchModule-5ab5bdee167ff2053d958740f7b104f55f945c1b12fac94ce74ee9c3a7e80a504e0fda6dce989c0a998b8bf3bc76fe0b9a0348a5d1312e37896f4625d846a58c"' :
                                        'id="xs-injectables-links-module-WatchModule-5ab5bdee167ff2053d958740f7b104f55f945c1b12fac94ce74ee9c3a7e80a504e0fda6dce989c0a998b8bf3bc76fe0b9a0348a5d1312e37896f4625d846a58c"' }>
                                        <li class="link">
                                            <a href="injectables/WatchService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WatchService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/WatchModule.html" data-type="entity-link" >WatchModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-WatchModule-bc1a268aace6d153a78ac1f38521cfd35aeaa86253b78b3e645c222827665401a0c1dd3a21ca802648c99affeb29f54fea587e0b0ec829660196e51b44676edf-1"' : 'data-bs-target="#xs-controllers-links-module-WatchModule-bc1a268aace6d153a78ac1f38521cfd35aeaa86253b78b3e645c222827665401a0c1dd3a21ca802648c99affeb29f54fea587e0b0ec829660196e51b44676edf-1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-WatchModule-bc1a268aace6d153a78ac1f38521cfd35aeaa86253b78b3e645c222827665401a0c1dd3a21ca802648c99affeb29f54fea587e0b0ec829660196e51b44676edf-1"' :
                                            'id="xs-controllers-links-module-WatchModule-bc1a268aace6d153a78ac1f38521cfd35aeaa86253b78b3e645c222827665401a0c1dd3a21ca802648c99affeb29f54fea587e0b0ec829660196e51b44676edf-1"' }>
                                            <li class="link">
                                                <a href="controllers/ViewsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-WatchModule-bc1a268aace6d153a78ac1f38521cfd35aeaa86253b78b3e645c222827665401a0c1dd3a21ca802648c99affeb29f54fea587e0b0ec829660196e51b44676edf-1"' : 'data-bs-target="#xs-injectables-links-module-WatchModule-bc1a268aace6d153a78ac1f38521cfd35aeaa86253b78b3e645c222827665401a0c1dd3a21ca802648c99affeb29f54fea587e0b0ec829660196e51b44676edf-1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-WatchModule-bc1a268aace6d153a78ac1f38521cfd35aeaa86253b78b3e645c222827665401a0c1dd3a21ca802648c99affeb29f54fea587e0b0ec829660196e51b44676edf-1"' :
                                        'id="xs-injectables-links-module-WatchModule-bc1a268aace6d153a78ac1f38521cfd35aeaa86253b78b3e645c222827665401a0c1dd3a21ca802648c99affeb29f54fea587e0b0ec829660196e51b44676edf-1"' }>
                                        <li class="link">
                                            <a href="injectables/WatchService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WatchService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ActivateMonitizationCommand.html" data-type="entity-link" >ActivateMonitizationCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/ActivateMonitizationCommandHandler.html" data-type="entity-link" >ActivateMonitizationCommandHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/Auth0SignupRequestDto.html" data-type="entity-link" >Auth0SignupRequestDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseServiceException.html" data-type="entity-link" >BaseServiceException</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChangeLanguageCommand.html" data-type="entity-link" >ChangeLanguageCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChangeLanguageCommandHandler.html" data-type="entity-link" >ChangeLanguageCommandHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChangeLanguageEvent.html" data-type="entity-link" >ChangeLanguageEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChangeLanguageEventHandler.html" data-type="entity-link" >ChangeLanguageEventHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChangeNotificationCommand.html" data-type="entity-link" >ChangeNotificationCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChangeNotificationCommandHandler.html" data-type="entity-link" >ChangeNotificationCommandHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChangeNotificationStatusEvent.html" data-type="entity-link" >ChangeNotificationStatusEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChangeNotificationStatusEventHandler.html" data-type="entity-link" >ChangeNotificationStatusEventHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChangePasswordRequestDto.html" data-type="entity-link" >ChangePasswordRequestDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChangePasswordRequestResponse.html" data-type="entity-link" >ChangePasswordRequestResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChangeThemeCommand.html" data-type="entity-link" >ChangeThemeCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChangeThemeCommandHandler.html" data-type="entity-link" >ChangeThemeCommandHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChangeThemeEvent.html" data-type="entity-link" >ChangeThemeEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChangeThemeEventHandler.html" data-type="entity-link" >ChangeThemeEventHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/CommentAggregate.html" data-type="entity-link" >CommentAggregate</a>
                            </li>
                            <li class="link">
                                <a href="classes/CommentEntity.html" data-type="entity-link" >CommentEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/CommentOnVideo.html" data-type="entity-link" >CommentOnVideo</a>
                            </li>
                            <li class="link">
                                <a href="classes/CommentText.html" data-type="entity-link" >CommentText</a>
                            </li>
                            <li class="link">
                                <a href="classes/CommentVideoResponse.html" data-type="entity-link" >CommentVideoResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/CompleteProfileEventHandler.html" data-type="entity-link" >CompleteProfileEventHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/CompleteSignupCommandHandler.html" data-type="entity-link" >CompleteSignupCommandHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateHubCommand.html" data-type="entity-link" >CreateHubCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateHubCommandHandler.html" data-type="entity-link" >CreateHubCommandHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProfileCommand.html" data-type="entity-link" >CreateProfileCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProfileEvent.html" data-type="entity-link" >CreateProfileEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateVideoRequestDto.html" data-type="entity-link" >CreateVideoRequestDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DatabaseConnectionFailedException.html" data-type="entity-link" >DatabaseConnectionFailedException</a>
                            </li>
                            <li class="link">
                                <a href="classes/DatabaseConnectionFailedException-1.html" data-type="entity-link" >DatabaseConnectionFailedException</a>
                            </li>
                            <li class="link">
                                <a href="classes/DatabaseException.html" data-type="entity-link" >DatabaseException</a>
                            </li>
                            <li class="link">
                                <a href="classes/DatabaseException-1.html" data-type="entity-link" >DatabaseException</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteUserRequestDto.html" data-type="entity-link" >DeleteUserRequestDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteUserRequestResponse.html" data-type="entity-link" >DeleteUserRequestResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/EditVideoCommand.html" data-type="entity-link" >EditVideoCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/EditVideoHandler.html" data-type="entity-link" >EditVideoHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindAllUsersHandler.html" data-type="entity-link" >FindAllUsersHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindAllUsersQuery.html" data-type="entity-link" >FindAllUsersQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindHubByIdQuery.html" data-type="entity-link" >FindHubByIdQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindHubByIdQueryHandler.html" data-type="entity-link" >FindHubByIdQueryHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindUserByAuthIdQuery.html" data-type="entity-link" >FindUserByAuthIdQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindUserByAuthIdQueryHandler.html" data-type="entity-link" >FindUserByAuthIdQueryHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindUserByIdHandler.html" data-type="entity-link" >FindUserByIdHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindUserByIdQuery.html" data-type="entity-link" >FindUserByIdQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindUserByIdRequestDto.html" data-type="entity-link" >FindUserByIdRequestDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindUserRequestResponse.html" data-type="entity-link" >FindUserRequestResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindVideoHandler.html" data-type="entity-link" >FindVideoHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindVideoQuery.html" data-type="entity-link" >FindVideoQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindVideoRequestDto.html" data-type="entity-link" >FindVideoRequestDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FoundVideoRequestResponse.html" data-type="entity-link" >FoundVideoRequestResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/GatewayExceptionFilter.html" data-type="entity-link" >GatewayExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetDislikesCountForVideo.html" data-type="entity-link" >GetDislikesCountForVideo</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetLikesCountForVideo.html" data-type="entity-link" >GetLikesCountForVideo</a>
                            </li>
                            <li class="link">
                                <a href="classes/GrpcAppExceptionFilter.html" data-type="entity-link" >GrpcAppExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/GrpcApplicationError.html" data-type="entity-link" >GrpcApplicationError</a>
                            </li>
                            <li class="link">
                                <a href="classes/HubCreatedEvent.html" data-type="entity-link" >HubCreatedEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/HubCreatedEventHandler.html" data-type="entity-link" >HubCreatedEventHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/HubMonitizedEvent.html" data-type="entity-link" >HubMonitizedEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/HubMonitizedEventHandler.html" data-type="entity-link" >HubMonitizedEventHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/HubQueryModel.html" data-type="entity-link" >HubQueryModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/HubUpdatedEvent.html" data-type="entity-link" >HubUpdatedEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/HubUpdatedEventHandler.html" data-type="entity-link" >HubUpdatedEventHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/InvalidDatabaseQueryException.html" data-type="entity-link" >InvalidDatabaseQueryException</a>
                            </li>
                            <li class="link">
                                <a href="classes/InvalidDatabaseQueryException-1.html" data-type="entity-link" >InvalidDatabaseQueryException</a>
                            </li>
                            <li class="link">
                                <a href="classes/InvalidDomainInputException.html" data-type="entity-link" >InvalidDomainInputException</a>
                            </li>
                            <li class="link">
                                <a href="classes/InvalidInputException.html" data-type="entity-link" >InvalidInputException</a>
                            </li>
                            <li class="link">
                                <a href="classes/LikeAggregate.html" data-type="entity-link" >LikeAggregate</a>
                            </li>
                            <li class="link">
                                <a href="classes/LikeEntity.html" data-type="entity-link" >LikeEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/LikeNotFoundException.html" data-type="entity-link" >LikeNotFoundException</a>
                            </li>
                            <li class="link">
                                <a href="classes/LikeNotFoundGrpcException.html" data-type="entity-link" >LikeNotFoundGrpcException</a>
                            </li>
                            <li class="link">
                                <a href="classes/LikeStatus.html" data-type="entity-link" >LikeStatus</a>
                            </li>
                            <li class="link">
                                <a href="classes/LocalSignupRequestDto.html" data-type="entity-link" >LocalSignupRequestDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/OnBoardingCompletedEvent.html" data-type="entity-link" >OnBoardingCompletedEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/OnBoardingCompletedEventHandler.html" data-type="entity-link" >OnBoardingCompletedEventHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/PhoneNumberVerfiedEvent.html" data-type="entity-link" >PhoneNumberVerfiedEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/PhoneNumberVerfiedEventHandler.html" data-type="entity-link" >PhoneNumberVerfiedEventHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/PreSignedUrlRequestResponse.html" data-type="entity-link" >PreSignedUrlRequestResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/PublishedVideoRequestResponse.html" data-type="entity-link" >PublishedVideoRequestResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/PublishVideoCommand.html" data-type="entity-link" >PublishVideoCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/PublishVideoHandler.html" data-type="entity-link" >PublishVideoHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/SagaExceptionFilter.html" data-type="entity-link" >SagaExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/SaveUserProfileDto.html" data-type="entity-link" >SaveUserProfileDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SigninRequestDTO.html" data-type="entity-link" >SigninRequestDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/SigninRequestResponse.html" data-type="entity-link" >SigninRequestResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignupRequestResponse.html" data-type="entity-link" >SignupRequestResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/UnauthorizedException.html" data-type="entity-link" >UnauthorizedException</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatedUserRequestResponse.html" data-type="entity-link" >UpdatedUserRequestResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatedVideoRequestResponse.html" data-type="entity-link" >UpdatedVideoRequestResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateHubCommand.html" data-type="entity-link" >UpdateHubCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateHubCommandHandler.html" data-type="entity-link" >UpdateHubCommandHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProfileCommand.html" data-type="entity-link" >UpdateProfileCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProfileCommandHandler.html" data-type="entity-link" >UpdateProfileCommandHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProfileEvent.html" data-type="entity-link" >UpdateProfileEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProfileEventHandler.html" data-type="entity-link" >UpdateProfileEventHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserRequestDto.html" data-type="entity-link" >UpdateUserRequestDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateVideoRequestDto.html" data-type="entity-link" >UpdateVideoRequestDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserAggregate.html" data-type="entity-link" >UserAggregate</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserAggregateFactory.html" data-type="entity-link" >UserAggregateFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserAlreadyExistsException.html" data-type="entity-link" >UserAlreadyExistsException</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserAlreadyExistsGrpcException.html" data-type="entity-link" >UserAlreadyExistsGrpcException</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserDOB.html" data-type="entity-link" >UserDOB</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserEmail.html" data-type="entity-link" >UserEmail</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserEntity.html" data-type="entity-link" >UserEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserEntityInvalidInputException.html" data-type="entity-link" >UserEntityInvalidInputException</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserHandle.html" data-type="entity-link" >UserHandle</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserId.html" data-type="entity-link" >UserId</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserId-1.html" data-type="entity-link" >UserId</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserId-2.html" data-type="entity-link" >UserId</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserInvalidDOBException.html" data-type="entity-link" >UserInvalidDOBException</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserInvalidDOBGrpcException.html" data-type="entity-link" >UserInvalidDOBGrpcException</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserLanguagePreference.html" data-type="entity-link" >UserLanguagePreference</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserNotFoundException.html" data-type="entity-link" >UserNotFoundException</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserNotFoundGrpcException.html" data-type="entity-link" >UserNotFoundGrpcException</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserPhoneNumber.html" data-type="entity-link" >UserPhoneNumber</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserQueryModel.html" data-type="entity-link" >UserQueryModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserRegion.html" data-type="entity-link" >UserRegion</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserThemePreference.html" data-type="entity-link" >UserThemePreference</a>
                            </li>
                            <li class="link">
                                <a href="classes/VerifyHubCommand.html" data-type="entity-link" >VerifyHubCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/VerifyHubEventHandler.html" data-type="entity-link" >VerifyHubEventHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/VerifyPhoneNumberCommand.html" data-type="entity-link" >VerifyPhoneNumberCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/VerifyPhoneNumberCommandHandler.html" data-type="entity-link" >VerifyPhoneNumberCommandHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/VideoAggregate.html" data-type="entity-link" >VideoAggregate</a>
                            </li>
                            <li class="link">
                                <a href="classes/VideoCreatedDomainEvent.html" data-type="entity-link" >VideoCreatedDomainEvent</a>
                            </li>
                            <li class="link">
                                <a href="classes/VideoCreatedDomainEventHandler.html" data-type="entity-link" >VideoCreatedDomainEventHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/VideoDescription.html" data-type="entity-link" >VideoDescription</a>
                            </li>
                            <li class="link">
                                <a href="classes/VideoEntity.html" data-type="entity-link" >VideoEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/VideoId.html" data-type="entity-link" >VideoId</a>
                            </li>
                            <li class="link">
                                <a href="classes/VideoId-1.html" data-type="entity-link" >VideoId</a>
                            </li>
                            <li class="link">
                                <a href="classes/VideoId-2.html" data-type="entity-link" >VideoId</a>
                            </li>
                            <li class="link">
                                <a href="classes/VideoLikedStatusCreatedRequestResponse.html" data-type="entity-link" >VideoLikedStatusCreatedRequestResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/VideoLikeStatusCreatedDto.html" data-type="entity-link" >VideoLikeStatusCreatedDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/VideoNotFoundException.html" data-type="entity-link" >VideoNotFoundException</a>
                            </li>
                            <li class="link">
                                <a href="classes/VideoNotFoundGrpcException.html" data-type="entity-link" >VideoNotFoundGrpcException</a>
                            </li>
                            <li class="link">
                                <a href="classes/VideoOwner.html" data-type="entity-link" >VideoOwner</a>
                            </li>
                            <li class="link">
                                <a href="classes/VideoPublish.html" data-type="entity-link" >VideoPublish</a>
                            </li>
                            <li class="link">
                                <a href="classes/VideoQueryModel.html" data-type="entity-link" >VideoQueryModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/VideoTitle.html" data-type="entity-link" >VideoTitle</a>
                            </li>
                            <li class="link">
                                <a href="classes/VideoUrl.html" data-type="entity-link" >VideoUrl</a>
                            </li>
                            <li class="link">
                                <a href="classes/VideoVisibilty.html" data-type="entity-link" >VideoVisibilty</a>
                            </li>
                            <li class="link">
                                <a href="classes/ViewAggregate.html" data-type="entity-link" >ViewAggregate</a>
                            </li>
                            <li class="link">
                                <a href="classes/ViewEntity.html" data-type="entity-link" >ViewEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/ViewsVideoResponse.html" data-type="entity-link" >ViewsVideoResponse</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppConfigService-11.html" data-type="entity-link" >AppConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/Auth0OAuthGaurd.html" data-type="entity-link" >Auth0OAuthGaurd</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/Auth0Strategy.html" data-type="entity-link" >Auth0Strategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AwsS3StorageAdapter.html" data-type="entity-link" >AwsS3StorageAdapter</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CloudinaryStorageAdapter.html" data-type="entity-link" >CloudinaryStorageAdapter</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CommentAggregateFactory.html" data-type="entity-link" >CommentAggregateFactory</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CommentAggregatePersistance.html" data-type="entity-link" >CommentAggregatePersistance</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GatewayJwtGuard.html" data-type="entity-link" >GatewayJwtGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GCPStorageAdapter.html" data-type="entity-link" >GCPStorageAdapter</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HubAggregate.html" data-type="entity-link" >HubAggregate</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HubAggregateFactory.html" data-type="entity-link" >HubAggregateFactory</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HubAggregatePersistanceACL.html" data-type="entity-link" >HubAggregatePersistanceACL</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HubBio.html" data-type="entity-link" >HubBio</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HubCommandRepository.html" data-type="entity-link" >HubCommandRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HubCoverImage.html" data-type="entity-link" >HubCoverImage</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HubEntity.html" data-type="entity-link" >HubEntity</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HubQueryRepository.html" data-type="entity-link" >HubQueryRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HubUserId.html" data-type="entity-link" >HubUserId</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LikeAggregateFactory.html" data-type="entity-link" >LikeAggregateFactory</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LikePersistanceACL.html" data-type="entity-link" >LikePersistanceACL</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LikeRepository.html" data-type="entity-link" >LikeRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/QueryModelResponseMapper.html" data-type="entity-link" >QueryModelResponseMapper</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResponseTimeMiddleware.html" data-type="entity-link" >ResponseTimeMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StorageAdapter.html" data-type="entity-link" >StorageAdapter</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserAggregatePersistanceACL.html" data-type="entity-link" >UserAggregatePersistanceACL</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserCommandRepository.html" data-type="entity-link" >UserCommandRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserQueryRepository.html" data-type="entity-link" >UserQueryRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VideoAggregateFactory.html" data-type="entity-link" >VideoAggregateFactory</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VideoAggregatePersistanceACL.html" data-type="entity-link" >VideoAggregatePersistanceACL</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VideoCommandRepository.html" data-type="entity-link" >VideoCommandRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VideoQueryRepository.html" data-type="entity-link" >VideoQueryRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ViewAggregateFactory.html" data-type="entity-link" >ViewAggregateFactory</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ViewPeristanceAggregateACL.html" data-type="entity-link" >ViewPeristanceAggregateACL</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ViewRepository.html" data-type="entity-link" >ViewRepository</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AggregateFactory.html" data-type="entity-link" >AggregateFactory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AggregateFactory-1.html" data-type="entity-link" >AggregateFactory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AggregateFactory-2.html" data-type="entity-link" >AggregateFactory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AggregateFactory-3.html" data-type="entity-link" >AggregateFactory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Auth0ProfileUser.html" data-type="entity-link" >Auth0ProfileUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AwsGetFileAsNodeJsStreamParam.html" data-type="entity-link" >AwsGetFileAsNodeJsStreamParam</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AwsGetPresignedUrlParams.html" data-type="entity-link" >AwsGetPresignedUrlParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AwsPutFileOnS3AsNodeJsStreamParam.html" data-type="entity-link" >AwsPutFileOnS3AsNodeJsStreamParam</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CloudinaryGetFileAsNodeJsStreamParam.html" data-type="entity-link" >CloudinaryGetFileAsNodeJsStreamParam</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CloudinaryGetPresignedUrlParams.html" data-type="entity-link" >CloudinaryGetPresignedUrlParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CloudinaryPutFileOnS3AsNodeJsStreamParam.html" data-type="entity-link" >CloudinaryPutFileOnS3AsNodeJsStreamParam</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CloudPreSignedUrlResponse.html" data-type="entity-link" >CloudPreSignedUrlResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CloudServiceClient.html" data-type="entity-link" >CloudServiceClient</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CloudServiceController.html" data-type="entity-link" >CloudServiceController</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CommentServiceClient.html" data-type="entity-link" >CommentServiceClient</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CommentServiceController.html" data-type="entity-link" >CommentServiceController</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CommentVideoDto.html" data-type="entity-link" >CommentVideoDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CommentVideoResponse.html" data-type="entity-link" >CommentVideoResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreatedUserMessageDto.html" data-type="entity-link" >CreatedUserMessageDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DislikesFindCountForAVideoDto.html" data-type="entity-link" >DislikesFindCountForAVideoDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DislikesFindCountForAVideoResponse.html" data-type="entity-link" >DislikesFindCountForAVideoResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DownloadFileAsStreamDto.html" data-type="entity-link" >DownloadFileAsStreamDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EmailHealthCheckRequest.html" data-type="entity-link" >EmailHealthCheckRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EmailHealthCheckResponse.html" data-type="entity-link" >EmailHealthCheckResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EmailServiceClient.html" data-type="entity-link" >EmailServiceClient</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EmailServiceController.html" data-type="entity-link" >EmailServiceController</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Empty.html" data-type="entity-link" >Empty</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Empty-1.html" data-type="entity-link" >Empty</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Empty-2.html" data-type="entity-link" >Empty</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Empty-3.html" data-type="entity-link" >Empty</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ErrorPayload.html" data-type="entity-link" >ErrorPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FileChunk.html" data-type="entity-link" >FileChunk</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GcpGetFileAsNodeJsStreamParam.html" data-type="entity-link" >GcpGetFileAsNodeJsStreamParam</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GCPGetPreSignedUrlParams.html" data-type="entity-link" >GCPGetPreSignedUrlParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GcpPutFileOnS3AsNodeJsStreamParam.html" data-type="entity-link" >GcpPutFileOnS3AsNodeJsStreamParam</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GetPresignedUrlDto.html" data-type="entity-link" >GetPresignedUrlDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GrpcApplicationErrorType.html" data-type="entity-link" >GrpcApplicationErrorType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HealthCheckRequest.html" data-type="entity-link" >HealthCheckRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HealthCheckResponse.html" data-type="entity-link" >HealthCheckResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HealthClient.html" data-type="entity-link" >HealthClient</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HealthController.html" data-type="entity-link" >HealthController</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HubActivateMonitizationDto.html" data-type="entity-link" >HubActivateMonitizationDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HubCreatedResponse.html" data-type="entity-link" >HubCreatedResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HubCreateDto.html" data-type="entity-link" >HubCreateDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HubFindByIdDto.html" data-type="entity-link" >HubFindByIdDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HubFindByIdResponse.html" data-type="entity-link" >HubFindByIdResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HubMonitizationActivatedResponse.html" data-type="entity-link" >HubMonitizationActivatedResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HubServiceClient.html" data-type="entity-link" >HubServiceClient</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HubServiceController.html" data-type="entity-link" >HubServiceController</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HubUpdateByIdDto.html" data-type="entity-link" >HubUpdateByIdDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HubUpdateByIdResponse.html" data-type="entity-link" >HubUpdateByIdResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HubVerifyByIdDto.html" data-type="entity-link" >HubVerifyByIdDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HubVerifyByIdResponse.html" data-type="entity-link" >HubVerifyByIdResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAggregateFactory.html" data-type="entity-link" >IAggregateFactory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAggregateFactory-1.html" data-type="entity-link" >IAggregateFactory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAggregatePersistanceACL.html" data-type="entity-link" >IAggregatePersistanceACL</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICommandRepository.html" data-type="entity-link" >ICommandRepository</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ICommentRepo.html" data-type="entity-link" >ICommentRepo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IHubCommandRepository.html" data-type="entity-link" >IHubCommandRepository</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IHubQueryRepository.html" data-type="entity-link" >IHubQueryRepository</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ILikeRepository.html" data-type="entity-link" >ILikeRepository</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IQueryRepository.html" data-type="entity-link" >IQueryRepository</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IStorage.html" data-type="entity-link" >IStorage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUserCommandRepository.html" data-type="entity-link" >IUserCommandRepository</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUserQueryRepository.html" data-type="entity-link" >IUserQueryRepository</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IViewRepository.html" data-type="entity-link" >IViewRepository</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LikeFoundForVideoResponse.html" data-type="entity-link" >LikeFoundForVideoResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LikeModifiedStatusForVideoResponse.html" data-type="entity-link" >LikeModifiedStatusForVideoResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LikeServiceClient.html" data-type="entity-link" >LikeServiceClient</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LikeServiceController.html" data-type="entity-link" >LikeServiceController</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LikesFindCountForAVideoDto.html" data-type="entity-link" >LikesFindCountForAVideoDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LikesFindCountForAVideoResponse.html" data-type="entity-link" >LikesFindCountForAVideoResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LikesFindForUserForVideoDto.html" data-type="entity-link" >LikesFindForUserForVideoDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LikesFoundResponse.html" data-type="entity-link" >LikesFoundResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LikesHealthCheckRequest.html" data-type="entity-link" >LikesHealthCheckRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LikesHealthCheckResponse.html" data-type="entity-link" >LikesHealthCheckResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModifyLikeStatusForVideoDto.html" data-type="entity-link" >ModifyLikeStatusForVideoDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PreSignedUrlRequestDto.html" data-type="entity-link" >PreSignedUrlRequestDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RedisLikesOperations.html" data-type="entity-link" >RedisLikesOperations</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RedisWithCommentsOps.html" data-type="entity-link" >RedisWithCommentsOps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RedisWithWatchOperations.html" data-type="entity-link" >RedisWithWatchOperations</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SagaHealthCheckRequest.html" data-type="entity-link" >SagaHealthCheckRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SagaHealthCheckResponse.html" data-type="entity-link" >SagaHealthCheckResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SagaServiceClient.html" data-type="entity-link" >SagaServiceClient</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SagaServiceController.html" data-type="entity-link" >SagaServiceController</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SagaSignupDto.html" data-type="entity-link" >SagaSignupDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SagaSignupResponse.html" data-type="entity-link" >SagaSignupResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SendEmailMessage.html" data-type="entity-link" >SendEmailMessage</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StreamFileRequestDto.html" data-type="entity-link" >StreamFileRequestDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StreamFileToCloudResponse.html" data-type="entity-link" >StreamFileToCloudResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UploadFileDto.html" data-type="entity-link" >UploadFileDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UploadOptions.html" data-type="entity-link" >UploadOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UploadResult.html" data-type="entity-link" >UploadResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserAuthPayload.html" data-type="entity-link" >UserAuthPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserChangeNotificationStatusDto.html" data-type="entity-link" >UserChangeNotificationStatusDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserChangePreferredLanguageDto.html" data-type="entity-link" >UserChangePreferredLanguageDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserChangePreferredThemeDto.html" data-type="entity-link" >UserChangePreferredThemeDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserCreateProfileDto.html" data-type="entity-link" >UserCreateProfileDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserFindByAuthIdDto.html" data-type="entity-link" >UserFindByAuthIdDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserFindByIdDto.html" data-type="entity-link" >UserFindByIdDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserFoundResponse.html" data-type="entity-link" >UserFoundResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserNotificationStatusChangedResponse.html" data-type="entity-link" >UserNotificationStatusChangedResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserPhoneNumberVerifiedResponse.html" data-type="entity-link" >UserPhoneNumberVerifiedResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserPreferredLanguageChangedResponse.html" data-type="entity-link" >UserPreferredLanguageChangedResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserPreferredThemeChangedResponse.html" data-type="entity-link" >UserPreferredThemeChangedResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserProfileCreatedResponse.html" data-type="entity-link" >UserProfileCreatedResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserProfileUpdatedResponse.html" data-type="entity-link" >UserProfileUpdatedResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserServiceClient.html" data-type="entity-link" >UserServiceClient</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserServiceController.html" data-type="entity-link" >UserServiceController</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UsersFoundResponse.html" data-type="entity-link" >UsersFoundResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserUpdateByIdDto.html" data-type="entity-link" >UserUpdateByIdDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserUpdateProfileDto.html" data-type="entity-link" >UserUpdateProfileDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserUpdateProfileResponse.html" data-type="entity-link" >UserUpdateProfileResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserVerifyPhoneNumberDto.html" data-type="entity-link" >UserVerifyPhoneNumberDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VideoCreateDto.html" data-type="entity-link" >VideoCreateDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VideoFindDto.html" data-type="entity-link" >VideoFindDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VideoFoundResponse.html" data-type="entity-link" >VideoFoundResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VideoPublishedResponse.html" data-type="entity-link" >VideoPublishedResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VideoServiceClient.html" data-type="entity-link" >VideoServiceClient</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VideoServiceController.html" data-type="entity-link" >VideoServiceController</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VideosFoundResponse.html" data-type="entity-link" >VideosFoundResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VideosHealthCheckRequest.html" data-type="entity-link" >VideosHealthCheckRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VideosHealthCheckResponse.html" data-type="entity-link" >VideosHealthCheckResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VideoTranscodeDto.html" data-type="entity-link" >VideoTranscodeDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VideoUpdatedResponse.html" data-type="entity-link" >VideoUpdatedResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VideoUpdateDto.html" data-type="entity-link" >VideoUpdateDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ViewsServiceClient.html" data-type="entity-link" >ViewsServiceClient</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ViewsServiceController.html" data-type="entity-link" >ViewsServiceController</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ViewsVideoDto.html" data-type="entity-link" >ViewsVideoDto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ViewsVideoResponse.html" data-type="entity-link" >ViewsVideoResponse</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});