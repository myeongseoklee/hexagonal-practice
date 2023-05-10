# Hexagonal Architecture Practice

## 프로젝트 구조

```bash
.
├── app.module.ts
├── auth
│   ├── decorator
│   │   └── role.decorator.ts
│   ├── enum
│   │   └── role.enum.ts
│   └── guard
│       ├── auth.guard.ts
│       └── role.guard.ts
├── board
│   ├── adaptor
│   │   ├── in-web
│   │   │   ├── board.controller.ts
│   │   │   └── in-web.module.ts
│   │   └── out-persistence
│   │       ├── board-persistence.adaptor.ts
│   │       ├── board-persistence.module.ts
│   │       ├── board.mapper.ts
│   │       └── board.orm-entity.ts
│   ├── application
│   │   ├── board.service.ts
│   │   └── port
│   │       ├── in
│   │       │   ├── dto
│   │       │   │   ├── board-res.dto.ts
│   │       │   │   ├── create-board-req.dto.ts
│   │       │   │   ├── get-boards-res.dto.ts
│   │       │   │   ├── get-boards.command.ts
│   │       │   │   ├── update-board-body-req.dto.ts
│   │       │   │   └── update-board-req.dto.ts
│   │       │   ├── get-boards.use-case.ts
│   │       │   ├── handle-board.use-case.ts
│   │       │   └── pipe
│   │       │       └── update-board-validation.pipe.ts
│   │       └── out
│   │           ├── get-board.port.ts
│   │           ├── get-boards.port.ts
│   │           └── handle-board.port.ts
│   ├── board.module.ts
│   └── domain
│       ├── board-window.entity.ts
│       └── board.entity.ts
├── common
│   ├── config
│   │   ├── global-config.ts
│   │   └── orm-config.ts
│   ├── exception
│   │   ├── custom-validation-error.ts
│   │   └── http-exception.filter.ts
│   └── res
│       └── response.entity.ts
└── main.ts
```

<br>

---

# 컴포넌트

## **1. Board**

### 📌 **Adaptor**

#### **Primary Adaptor(in-web)**

사용자(consumer)의 요청을 받아들이고 도메인 로직 처리 결과를 반환하는 계층

이벤트 드리븐 서비스로 구성될 경우에는 primary adaptor의 역할이 명확하지만 웹 서비스의 경우에는 모호해진다. 따라서 primary adaptor는 웹 프레임워크들의 **controller** 또는 람다의 handler와 같은 개념에 통합되어 사용되며, **클라이언트로부터 입력받은 값의 유효성을 체크하고 적절한 형태로 가공하여 비즈니스 로직을 실행하는 서비스(interface - in port의 use-case)를 호출**한다.

✅ **Controller** : 사용자의 요청 데이터를 받아서 dto 또는 command로 변환하여 Service에 전달한다. 이 때 직접 Service를 호출(의존)하지 않고 interface(useCase)에게 위임한다.

<br>

#### **Secondary adaptor(out-persistence)**

✅ **Adaptor** : 도메인 모델(entity)의 처리에 사용되는 어댑터. 외부 Infra(db, aws 등)와 연결된다.

✅ **Mapper** : persistence adaptor에서 조회한 ORM Entity를 도메인 Entity로 변환하고 웹 어댑터에서 요청하는 도메인 정보를 persistence 어댑터에서 활용하기 위해 ORM Entity로 변환하는 과정이 필요해 만든 Mapper class.

즉, 도메인 -> ORM Entity , ORM Entity -> 도메인 으로 변환하는 Mapper class

> Mapper class의 필요성
>
> mapper class가 있으면 도메인 레이어와 영속성 레이어의 결합을 낮출 수 있음.
>
> 만약 mapper가 없다면, adaptor에서 반환하는 값은 ORM Entity의 형태인데, 만약 DB를 현재 사용하는 MySQL에서 조회용 DB로 MongoDB를 채택하는 경우 ORM DB의 변경으로 인해 port interface와 Service의 코드(서비스에서 port를 통해 반환 받는 데이터의 타입)이 변해야 하고, 그에 따라 사이드 이펙트 발생할 가능성이 있음. 하지만, mapper class를 따로 둔다면, db가 변하더라도 해당 db에 맞는 mapper method만 추가 구현하여 adaptor에서 활용하면 service와 port interface에서는 변경할 코드가 없음.

✅ **ORM entity** : db의 스키마를 정의하는 entity.

<br>

### 📌 **Application**

#### **Port**

서비스에서 구현, 호출 될 인터페이스

✅ **in-port** : use-case 또는 iService. in-web adaptor에 의해 호출됨(in-web adaptor가 in-port를 의존)

✅ **out-port** : port 또는 iRepository. out-persistence에 의해 호출됨(out-persistence adaptor가 out-port를 의존)

✅ **DTO** : req dto와 res dto로 구성. req dto의 경우 command(명령어, ~해라)의 성격이 강하므로 command로 명명해도 될듯.

req dto는 들어오는 데이터를 dto에 담아 유효성을 검증하여 service로 보냄. service에서는 dto 데이터가 아닌 도메인 객체를 다뤄야 하므로 dto를 도메인 객체로 전환하는 메서드 구현(of, toEntity)

res dto는 반환되는 도메인 객체(entity)를 그대로 내보내지 않고, 필요한 데이터만 응답 객체로 변환하기 위해 사용(private 변수 캡슐화)

<br>

#### **Service**

useCase 구현체. 도메인 로직과 함께 사용되는 비즈니스 로직(기반환경, 트랜잭션, 메일&SMS발송 등 다른 인프라와 통신을 담당하는 역할 등)들을 수행한다.

<br>

### 📌 **Domain**

#### **Entity**

도메인 엔티티 계층

도메인의 핵심 기능만을 담당하며 도메인의 문제 해결에 순수하게 집중하는 계층

외부 애플리케이션 로직(service) 등 어떤 계층에도 의존하지 않는 순수한 계층

<br>

## **2. Common**

### response 엔티티

응답 객체의 컨벤션을 통일하기 위한 엔티티

> 출처 : https://github.com/jojoldu/monorepo-nestjs-typeorm/blob/da83faabce42ac8521203e19df5df928b3fa4b4d/libs/common-config/src/res/ResponseEntity.ts

### exception

응답에 성공한 경우 응답 객체를 반환하기 쉬우나, 예외가 발생할 경우 응답 객체를 조작해야 하는데 그 로직이 들어가있음.

> 출처 : https://github.com/jojoldu/monorepo-nestjs-typeorm/tree/da83faabce42ac8521203e19df5df928b3fa4b4d/libs/common-config/src/filter

<br>

## **3. Auth**

<br>

---

# 구현 기능

## ✅ typeORM을 활용한 게시판 CRUD

### 게시글 전체 조회

### 게시글 단건 조회

### 게시물 생성

### 게시물 수정

### 게시물 삭제

<br>

## ✅ useGuard를 통한 유저 인증

user 엔티티를 따로 두지 않았으므로 회원가입과 로그인 등의 기능은 미 구현.

Request header의 Authorization에 담긴 accessToken의 값에 따라 인증, 인가 처리

> accessToken이 필요 없는 경우 검증 x
>
> 본인만 접근 가능한 리소스의 경우 accessToken이 'me'
>
> 인증된 유저라면 모두 접근 가능한 리소스의 경우 accessToken이 'user'로 보내져야 한다.
