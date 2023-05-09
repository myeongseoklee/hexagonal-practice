# Hexagonal Architecture Practice

## 구현 기능

✅ typeORM을 활용한 게시판 CRUD

✅ useGuard를 통한 유저 인증

user 엔티티를 따로 두지 않았으므로 회원가입과 로그인 등의 기능은 미 구현.

Request header의 Authorization에 담긴 accessToken의 값에 따라 인증, 인가 처리

> accessToken이 필요 없는 경우 검증 x
>
> 본인만 접근 가능한 리소스의 경우 accessToken이 'me'
>
> 인증된 유저라면 모두 접근 가능한 리소스의 경우 accessToken이 'user'로 보내져야 한다.

## 폴더 구조

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
│   ├── board.module.ts
│   └── domain
│       ├── entity
│       │   ├── board-window.entity.ts
│       │   └── board.entity.ts
│       ├── port
│       │   ├── in
│       │   │   ├── dto
│       │   │   │   ├── board-res.dto.ts
│       │   │   │   ├── create-board-req.dto.ts
│       │   │   │   ├── get-boards-res.dto.ts
│       │   │   │   ├── get-boards.command.ts
│       │   │   │   ├── update-board-body-req.dto.ts
│       │   │   │   └── update-board-req.dto.ts
│       │   │   ├── get-boards.use-case.ts
│       │   │   ├── handle-board.use-case.ts
│       │   │   └── pipe
│       │   │       └── update-board-validation.pipe.ts
│       │   └── out
│       │       ├── get-board.port.ts
│       │       ├── get-boards.port.ts
│       │       └── handle-board.port.ts
│       └── service
│           └── board.service.ts
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
