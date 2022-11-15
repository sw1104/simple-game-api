# 프로젝트 개요
간단한 게임 시스템 API입니다. 유저를 등록하고 보스레이드에 입장합니다. 보스레이드는 레벨0~2까지 3단계가 있으며 클리어 시 해당 단계에 맞는 점수를 얻습니다. 보스레이드에는 한명의 유저만 입장이 가능하며 제한 시간은 3분입니다. 

# 기술 스택
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/></a> <img src="https://img.shields.io/badge/NestJs-E0234E?style=flat-square&logo=NestJs&logoColor=white"/></a> <img src="https://img.shields.io/badge/Mysql-E6B91E?style=flat-square&logo=MySql&logoColor=white"/></a> <img src="https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=Redis&logoColor=white"/></a> <img src="https://img.shields.io/badge/TypeOrm-262627?style=flat-square&logo=TypeOrm&logoColor=white"/></a>

# ERD 

<img width="296" alt="스크린샷 2022-11-16 06 58 49" src="https://user-images.githubusercontent.com/105622759/202034195-d3b8f18a-c7b3-4e5b-be35-68aee277df07.png">

# 구현 사항

## 유저 등록 API

등록 요청시 유저의 ID를 반환합니다.

<img width="442" alt="스크린샷 2022-11-16 07 01 32" src="https://user-images.githubusercontent.com/105622759/202034594-7f758197-45b0-4458-9bb2-0360b3c377d0.png">

## 유저 조회 API

해당 유저의 정보와 레이드 기록을 조회합니다.

<img width="505" alt="스크린샷 2022-11-16 07 01 57" src="https://user-images.githubusercontent.com/105622759/202034607-4cec0f23-5f99-460a-8a65-840c44f6fee9.png">


## 보스레이드 입장 API

레이드 입장 가능 상태시 레이드에 입장합니다.

<img width="421" alt="스크린샷 2022-11-16 07 02 30" src="https://user-images.githubusercontent.com/105622759/202034641-3302b649-aa09-4afa-92b0-fc530c3c8b2c.png">


## 보스레이드 종료 API

종료시 따로 응답은 없습니다.

<img width="486" alt="스크린샷 2022-11-16 07 02 55" src="https://user-images.githubusercontent.com/105622759/202034653-f7b5d0a0-599f-4f08-abc4-0e69d4d80c94.png">


## 보스레이드 상태 조회

입장 가능한지 아닌지 확인합니다.

<img width="386" alt="스크린샷 2022-11-16 07 02 07" src="https://user-images.githubusercontent.com/105622759/202034617-681697b3-01d5-4be1-846d-659837eee2c4.png">


## 랭킹 API

해당 유저의 랭킹과 전체 랭킹을 나타냅니다.

<img width="450" alt="스크린샷 2022-11-16 07 03 06" src="https://user-images.githubusercontent.com/105622759/202034669-7eb1703d-9321-4819-ad7d-3bddf6839b07.png">


