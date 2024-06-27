# Changelog

## [2.0.0](https://github.com/JuliusKrause21/time-converter/compare/v1.0.6...v2.0.0) (2024-06-27)


### ⚠ BREAKING CHANGES

* `nextLeapYear` can not be undefined anymore

### Features

* export relevant constants with time converter class ([79ffbe8](https://github.com/JuliusKrause21/time-converter/commit/79ffbe883ba8d3fc6cbbd476cd4f89c8b501ee15))

## [1.0.6](https://github.com/JuliusKrause21/time-converter/compare/v1.0.5...v1.0.6) (2024-06-25)


### Bug Fixes

* correct logic to calculate leap year and extend tests ([c0ccfe6](https://github.com/JuliusKrause21/time-converter/commit/c0ccfe67d9ee25a38f3b615c01fdcc911d06a4d6))
* remove conditional function call and always calculate the next leap year ([bc7dad0](https://github.com/JuliusKrause21/time-converter/commit/bc7dad08ead61ee8dfe095f10a237f07fee0da69))

## [1.0.5](https://github.com/JuliusKrause21/gnss-time-converter/compare/v1.0.4...v1.0.5) (2024-06-24)


### Bug Fixes

* package vulnerabilities ([ac07aac](https://github.com/JuliusKrause21/gnss-time-converter/commit/ac07aac2af7f1dc415397d5743e3ab43fe731b6f))

## [1.0.4](https://github.com/JuliusKrause21/gnss-time-converter/compare/v1.0.3...v1.0.4) (2024-06-15)


### Bug Fixes

* extend tests to cover cases where leap seconds are not used ([e4f41b4](https://github.com/JuliusKrause21/gnss-time-converter/commit/e4f41b4e687998267c25162be168a36d6d16e80c))

## 1.0.3 (2024-06-14)


### Bug Fixes

* adapt node version ([8b2caf9](https://github.com/JuliusKrause21/gnss-time-converter/commit/8b2caf94b0d64bf2d78e1c901524a8e5129a0c08))
* match repo name to package.json name ([2519295](https://github.com/JuliusKrause21/gnss-time-converter/commit/25192956888de21b1b83cfdfa195bc9700be260b))
* remove pull_request event to only create release when PR is merged ([4973e55](https://github.com/JuliusKrause21/gnss-time-converter/commit/4973e55b2420c0dd935102b850c59565712b1032))
* use release-please actions to create a release, publish to npm and update the git version tag ([3a8803a](https://github.com/JuliusKrause21/gnss-time-converter/commit/3a8803a081fd0597d2a9cdf12a9265e19ec4650b))
