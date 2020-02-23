# [2.0.0](https://github.com/darukjs/daruk/compare/v0.5.8...v2.0.0) (2020-01-20)


### Bug Fixes

* daruk version typo in example ([ed8db78](https://github.com/darukjs/daruk/commit/ed8db7872e5f5cd48dba37d7db4b410a726e56b5))
* fix customLogger judge ([b4bb701](https://github.com/darukjs/daruk/commit/b4bb7015afaeb45a23b52b42f20dc4cfecfd0197))
* lodash security alert ([5de29ca](https://github.com/darukjs/daruk/commit/5de29caeaea925690429e21e5b93604802b59883))
* remove DarukCore interface ([c0d3ac1](https://github.com/darukjs/daruk/commit/c0d3ac169cee5295b0b755ada2b0b489060293d9))
* remove deepDefineProperty ([34307f0](https://github.com/darukjs/daruk/commit/34307f0cc41e6d2708b509a1998fccf7d6e9db68))
* remove deepDefineProperty code and test; ([1ab2a40](https://github.com/darukjs/daruk/commit/1ab2a40a08a9ae13b1730f1c7496026921a3eb30))
* remove extra unused typing ([a65cbb2](https://github.com/darukjs/daruk/commit/a65cbb29e615bc340b91bca481d2b65fe72e0166))
* test pass 100% ([a032335](https://github.com/darukjs/daruk/commit/a032335925222dfed342ae1260ef4d5a85a82c01))
* update package dependencies ([c38db2a](https://github.com/darukjs/daruk/commit/c38db2afaac8c87dde87eec31d4dd10a17634213))
* update set-value and mixin-deep security alert ([3a4e726](https://github.com/darukjs/daruk/commit/3a4e72649a73c6c231d1c12b6e57369ce62abcc7))


### Features

* mount timer to daruk instance ([02f2b4c](https://github.com/darukjs/daruk/commit/02f2b4c63c289f44e27a448263125e32cac24703))



## [0.5.8](https://github.com/darukjs/daruk/compare/v0.5.7...v0.5.8) (2019-05-20)


### Bug Fixes

* fix deepDefineProperty value judge and add deepMax limit ([c669f7a](https://github.com/darukjs/daruk/commit/c669f7af6d96388e9f6bae81d899f591253d7ffe))
* rewrite koa toJSON, support middleware name ([c4e6b60](https://github.com/darukjs/daruk/commit/c4e6b60e8b5736f635c9b18733206f85d8703cf5))
* update version and publish new version ([f044ddc](https://github.com/darukjs/daruk/commit/f044ddc3e50e5a427ba42ba23b007edd718a00b2))


### Features

* support [@cache](https://github.com/cache) ([6c6676c](https://github.com/darukjs/daruk/commit/6c6676c32521be6b6f6eba0a32d2d50434f82146))
* support [@disabled](https://github.com/disabled) for controller class or method ([aeb8ce8](https://github.com/darukjs/daruk/commit/aeb8ce813ca8c4a71188f3c3d6c62094325188b1))
* support [@parse](https://github.com/parse)Type ([1da8b1a](https://github.com/darukjs/daruk/commit/1da8b1a0cff8a5dcbcc4c133cb7f6701199fb5ca))
* support [@type](https://github.com/type)Parse ([#67](https://github.com/darukjs/daruk/issues/67)) ([44611c6](https://github.com/darukjs/daruk/commit/44611c6a0a43c6c57ac924021ffbc273498508a7))
* support [@validate](https://github.com/validate) ([2d919d9](https://github.com/darukjs/daruk/commit/2d919d95fecfbd5c5b8da14f4308220016f1fee4))


### Performance Improvements

* add type declare DarukEventName on DarukEventsClass ([818aac1](https://github.com/darukjs/daruk/commit/818aac15b0fe2503f2d9394cb5638230267a0c86))



## [0.5.7](https://github.com/darukjs/daruk/compare/v0.5.6...v0.5.7) (2019-05-17)


### Bug Fixes

* repeat [@http](https://github.com/http)_method failure ([c4ac4a3](https://github.com/darukjs/daruk/commit/c4ac4a3e3739a1f49773c63f7e0d5adb0c3662df))


### Features

* remove the monitor middleware from daruk ([cac8747](https://github.com/darukjs/daruk/commit/cac8747bf78beaae1e4d1c1823aefaa4ca6f1222))
* support [@middleware](https://github.com/middleware) set options ([13a11fa](https://github.com/darukjs/daruk/commit/13a11fa677d45a6e760a1a37e459515e5ac37b01))
* support [@required](https://github.com/required) ([6da370f](https://github.com/darukjs/daruk/commit/6da370f45f6f541de31095d8aada731c7d4dadd1))
* update ver and publish new version ([15de3a1](https://github.com/darukjs/daruk/commit/15de3a1e542d4f46af6ff7655933848aba547f00))



## [0.5.6](https://github.com/darukjs/daruk/compare/v0.5.5...v0.5.6) (2019-05-16)


### Bug Fixes

* a bug on function deepDefineProperty ([27a99a1](https://github.com/darukjs/daruk/commit/27a99a1438a3c8f24cdd7ab11d2c42ad6d0f3069))
* add type 'listen' ([#48](https://github.com/darukjs/daruk/issues/48)) ([67a226a](https://github.com/darukjs/daruk/commit/67a226a2b5b26fa0c47bc5cf0d0c1f3805abf68a))


### Features

* add koa-body in daruk and fix example ([008029a](https://github.com/darukjs/daruk/commit/008029a55916f7720bf7c7a385223e26d153696e))
* index.d.ts add listen method copy from Koa ([8336735](https://github.com/darukjs/daruk/commit/8336735b7c9b5ad5d305a302ba7a5b856e72c4f0))
* update package ver and publish 0.5.6 ([b16160a](https://github.com/darukjs/daruk/commit/b16160a4cc6cf8ef179ebd05598a210e21165cac))
* use primaryKey to avoid user change module part ([c4cf9e3](https://github.com/darukjs/daruk/commit/c4cf9e32c76c0cb93f056169ef812a2eb95cc794))
* util support export object or function ([#62](https://github.com/darukjs/daruk/issues/62)) ([e5a6bb5](https://github.com/darukjs/daruk/commit/e5a6bb5422f6dabaaee4164097334460e1bdd57a))



## [0.5.5](https://github.com/darukjs/daruk/compare/v0.5.4...v0.5.5) (2019-05-13)


### Bug Fixes

* daruk types GlobalModule,Util,Glue,Service,etc interface ([7868681](https://github.com/darukjs/daruk/commit/78686812a4aa4299fd44792e809596916addc542))
* type decorator header ([#45](https://github.com/darukjs/daruk/issues/45)) ([fd59ae1](https://github.com/darukjs/daruk/commit/fd59ae103c5213574fdc3ffea6a96abc80eb3b28))
* update new version ([8c23116](https://github.com/darukjs/daruk/commit/8c2311626463619467cb034888ba51fb717675d0))


### Features

* [@header](https://github.com/header) ([3eece2e](https://github.com/darukjs/daruk/commit/3eece2e755766a635a23a760c6f60242c56a7b20))
* [@header](https://github.com/header) support parse object ([6ef2764](https://github.com/darukjs/daruk/commit/6ef2764fcaf80c589958631d67bbbbb3858f8fae))



## [0.5.4](https://github.com/darukjs/daruk/compare/v0.5.33...v0.5.4) (2019-05-12)


### Bug Fixes

* add emitter.setMaxListeners(100) default for daruk. ([3793c4c](https://github.com/darukjs/daruk/commit/3793c4cff071a78a30a8ec7e75d801b44499c1f9))
* auto load the default on packet ([01e85f8](https://github.com/darukjs/daruk/commit/01e85f812b1ebac6e20dfe48db418bcfc8e32a95))
* correct Config error ([#33](https://github.com/darukjs/daruk/issues/33)) ([55923a6](https://github.com/darukjs/daruk/commit/55923a676d2f94c0c4ae0fff8798f7ce64e4fc23))
* debug windows ujoin ([ae6a535](https://github.com/darukjs/daruk/commit/ae6a535515b84164557b96cc95dcea9749e48242))
* 原始类型小写 ([7a9a0b7](https://github.com/darukjs/daruk/commit/7a9a0b7884fbae41c691903b49b5d36f7bda192f))


### Features

* add [@types](https://github.com/types) and fix windows router error,update version ([7bb34cb](https://github.com/darukjs/daruk/commit/7bb34cb4bfedff5aa43736e6b58481ea4c7c0401))
* decorator [@type](https://github.com/type) ([#28](https://github.com/darukjs/daruk/issues/28)) ([09f17df](https://github.com/darukjs/daruk/commit/09f17dfe9ff4f59cc9d5412a9785e976328535cc))



## [0.5.33](https://github.com/darukjs/daruk/compare/v0.5.32...v0.5.33) (2019-05-10)


### Features

* add [@redirect](https://github.com/redirect) ([56b89ea](https://github.com/darukjs/daruk/commit/56b89eaeab4f4c23d08f8da44d7cce89537c3396))
* add [@redirect](https://github.com/redirect) ([2423a1c](https://github.com/darukjs/daruk/commit/2423a1c0d04dc9f69cf68ec115f62e3cc8fb8ed5))



## [0.5.32](https://github.com/darukjs/daruk/compare/v0.5.31...v0.5.32) (2019-05-10)


### Bug Fixes

* PrefixClassDecoratorFunc ([d942e87](https://github.com/darukjs/daruk/commit/d942e87247698d7f42bb323ecdcbb6792105d2bb))



## [0.5.31](https://github.com/darukjs/daruk/compare/v0.5.3...v0.5.31) (2019-05-10)


### Bug Fixes

* npm script prepublish ([7c8c0f8](https://github.com/darukjs/daruk/commit/7c8c0f8bb595e1635a9335b6fa821e9fd92e5a41))
* some decorator type ([d4db99a](https://github.com/darukjs/daruk/commit/d4db99a33f85556bd0311b1a4150ed9f301b9200))


### Features

* add [@prefix](https://github.com/prefix) for controller class ([7a48705](https://github.com/darukjs/daruk/commit/7a48705c7fa5768030c7902980f5748aa62ed472))



## [0.5.3](https://github.com/darukjs/daruk/compare/v0.5.2...v0.5.3) (2019-05-10)


### Bug Fixes

* fix routePath ujoin bug, when the path is regexp ([79da79d](https://github.com/darukjs/daruk/commit/79da79db3e0e5b8f27cc4c5bf202e92e5fb05ed9))



## [0.5.2](https://github.com/darukjs/daruk/compare/v0.4.1...v0.5.2) (2019-05-10)


### Features

* add a MethodDecorator to wrap json function ([8af6a0c](https://github.com/darukjs/daruk/commit/8af6a0c7b80b453868da8b4c21e9bd840863fb62))
* rebuild and publish ([ef2e002](https://github.com/darukjs/daruk/commit/ef2e002d2feb48575f02587e36fb67720b49260a))
* remove @JSON options,it must be application/json ([40bba2e](https://github.com/darukjs/daruk/commit/40bba2e1d7474d00a4d08d45af925ec4b772a38f))
* update new version for @JSON ([e64ab59](https://github.com/darukjs/daruk/commit/e64ab59dc9cf5ff7087995903b347e8973e0b183))



## [0.4.1](https://github.com/darukjs/daruk/compare/v0.4.0...v0.4.1) (2019-05-09)


### Bug Fixes

* fix tslint ([1a092c0](https://github.com/darukjs/daruk/commit/1a092c0c17e73ca7310c1626d162a21efd43d415))


### Features

* add listen instead of run ([0a0a913](https://github.com/darukjs/daruk/commit/0a0a913c6cd18adcea428a7c0a734991c99b0a59))
* add listen method instead of run ([974cf85](https://github.com/darukjs/daruk/commit/974cf85f4c076eca36a0cbc4866443f24ef9c5e7))
* update version 0.4.1 ([8833d04](https://github.com/darukjs/daruk/commit/8833d0424543982282cb434659cb8cf830c19881))



# [0.4.0](https://github.com/darukjs/daruk/compare/281d2abe600ba0790ffd3bc9f2f78e18d5234e46...v0.4.0) (2019-05-06)


### Bug Fixes

* **typings:** add semicolon ([7cd51b9](https://github.com/darukjs/daruk/commit/7cd51b9724d751abc3c13365bf18484202a71e6d))
* [@type](https://github.com/type) mv dependencies ([75eec8b](https://github.com/darukjs/daruk/commit/75eec8babba94c7f05c622e5d01bc0ad864a6735))
* add cross-env for devdependencies ([b0d334f](https://github.com/darukjs/daruk/commit/b0d334facb27ee7303e3a3773e7c1fbf45fc2d2b))
* add example npmignore ([dfab312](https://github.com/darukjs/daruk/commit/dfab3126ee59ff1c9d1a414cf1cc556a9af4ad9c))
* add upath and normalize router ([ac85728](https://github.com/darukjs/daruk/commit/ac857284b467ac5609cd2a8e3b2f7d94e7cdd638))
* framework decorator  types ([9b069c7](https://github.com/darukjs/daruk/commit/9b069c78f2667b3ce05f2d853325c5e78faef6a3))
* monitor not require ([73c5bee](https://github.com/darukjs/daruk/commit/73c5beebb609aa1238b86d6a1fe4ab238897236f))
* Router type fix ([b10e950](https://github.com/darukjs/daruk/commit/b10e950c9f0a373317f3ce0fb3d5e07d1449a35c))
* service initialization log ([8305c38](https://github.com/darukjs/daruk/commit/8305c3877c508ab7ae64d2ffd568f19b9b3d322b))
* tslint error,rm never use npm script ([630e829](https://github.com/darukjs/daruk/commit/630e8293d2baa12d8749edc8920fbd00abd3d30b))
* ujoin add router ([af3caa8](https://github.com/darukjs/daruk/commit/af3caa8c8e37d3eeb4978f12969b5e21fe77b0aa))
* update version ([04f1c8d](https://github.com/darukjs/daruk/commit/04f1c8d4b5bf7dfa407c91e80d2330778535e9cc))
* utils.isSubClass implementation ([ff458c8](https://github.com/darukjs/daruk/commit/ff458c832d68fa0c813d1753ce69ee08917710d5))
* utils.isSubClass implementation ([4b30009](https://github.com/darukjs/daruk/commit/4b3000955661ea30db9a5b49fbfaeb2c7d9b7714))


### Features

* add Request,Response interface on Daruk ([c57d5aa](https://github.com/darukjs/daruk/commit/c57d5aab158b574d30e88251da876868a4429a1b))
* init ([281d2ab](https://github.com/darukjs/daruk/commit/281d2abe600ba0790ffd3bc9f2f78e18d5234e46))
* optional email config ([0f3ef84](https://github.com/darukjs/daruk/commit/0f3ef84d7eadb3588372b88bb6efcff5b66f971f))
* support multiple middleware decorators ([b87d333](https://github.com/darukjs/daruk/commit/b87d3335f81e5b69fd9d50ccbeb9a5d33fcb22b1))



