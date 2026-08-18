# DB 설계 문서

이 문서는 현재 SQLAlchemy 모델과 Alembic 최신 리비전(`20260818_0003`) 기준입니다.
로컬 기본 DB는 SQLite이고, 배포 환경에서는 같은 모델을 Supabase Postgres에 적용합니다.

## 설계 원칙

- 모집글, 사용자, 카테고리, 지역을 분리해 중복 저장을 줄입니다.
- 채팅, 알림, 리뷰는 모집글/사용자를 외래키로 참조합니다.
- 리뷰 태그는 재사용 가능한 태그와 N:M 연결 테이블로 관리합니다.
- MVP 인증은 자체 `users` 테이블의 이메일/비밀번호 해시로 처리합니다.

## 관계 요약

```text
users 1 ── N group_buy_items
users 1 ── N chat_messages
users 1 ── N notifications
users 1 ── N reviews(reviewer_id, host_id)

categories 1 ── N group_buy_items
categories 1 ── N categories(parent_id)

locations 1 ── N group_buy_items

group_buy_items 1 ── N chat_messages
group_buy_items 1 ── N reviews

reviews N ── N tags (review_tags)
```

## 테이블

### users

회원과 모집글 작성자 프로필입니다.

| 컬럼 | 타입 | 제약 |
| --- | --- | --- |
| id | integer | PK |
| nickname | varchar(80) | not null, unique, index |
| email | varchar(255) | unique, index |
| password_hash | varchar(255) | nullable |
| avatar | varchar(32) | nullable |
| manner_temp | float | not null, default 36.5 |
| created_at | datetime | not null, default now |

### categories

대분류/소분류를 같은 테이블에서 표현합니다.

| 컬럼 | 타입 | 제약 |
| --- | --- | --- |
| id | integer | PK |
| name | varchar(80) | not null |
| parent_id | integer | FK categories.id |

제약:

- unique(`name`, `parent_id`)

### locations

모집글에 연결되는 동네 또는 지역입니다.

| 컬럼 | 타입 | 제약 |
| --- | --- | --- |
| id | integer | PK |
| name | varchar(120) | not null, unique, index |
| created_at | datetime | not null, default now |

### group_buy_items

공동구매 모집글 본문입니다.

| 컬럼 | 타입 | 제약 |
| --- | --- | --- |
| id | integer | PK |
| title | varchar(200) | not null |
| category_id | integer | not null, FK categories.id, index |
| location_id | integer | not null, FK locations.id, index |
| host_id | integer | not null, FK users.id, index |
| distance | varchar(40) | not null, default 300m |
| total_price | integer | not null |
| total_members | integer | not null |
| current_members | integer | not null, default 1 |
| unit | varchar(80) | nullable |
| image_url | text | not null |
| urgent | boolean | not null, default false |
| meeting_place | varchar(200) | not null |
| meeting_place_detail | varchar(200) | not null, default "" |
| description | text | not null, default "" |
| deadline | varchar(80) | not null, default "" |
| is_liked | boolean | not null, default false |
| status | varchar(20) | not null, default recruiting |
| created_at | datetime | not null, default now |
| updated_at | datetime | not null, default now |

제약:

- `total_price > 0`
- `total_members >= 2`
- `current_members >= 1`
- `current_members <= total_members`
- `status IN ('recruiting', 'completed', 'canceled')`

### chat_messages

모집글별 채팅 메시지입니다.

| 컬럼 | 타입 | 제약 |
| --- | --- | --- |
| id | integer | PK |
| item_id | integer | not null, FK group_buy_items.id, index |
| sender_id | integer | not null, FK users.id, index |
| type | varchar(32) | not null, default text |
| text | text | nullable |
| location_name | varchar(200) | nullable |
| location_detail | varchar(200) | nullable |
| display_time | varchar(40) | not null, default 방금 |
| display_date | varchar(80) | nullable |
| created_at | datetime | not null, default now |

제약:

- `type IN ('text', 'location_proposal', 'image', 'qr')`

### notifications

사용자별 알림입니다.

| 컬럼 | 타입 | 제약 |
| --- | --- | --- |
| id | integer | PK |
| recipient_id | integer | not null, FK users.id, index |
| title | varchar(120) | not null |
| content | text | not null |
| type | varchar(32) | not null |
| read | boolean | not null, default false |
| target_screen | varchar(40) | nullable |
| time_ago | varchar(40) | not null, default 방금 |
| created_at | datetime | not null, default now |

제약:

- `type IN ('group_buy', 'chat', 'keyword', 'review')`

### reviews

공동구매 완료 후 작성되는 리뷰입니다.

| 컬럼 | 타입 | 제약 |
| --- | --- | --- |
| id | integer | PK |
| item_id | integer | not null, FK group_buy_items.id, index |
| reviewer_id | integer | not null, FK users.id, index |
| host_id | integer | not null, FK users.id, index |
| rating | integer | not null |
| comment | text | not null, default "" |
| image_url | text | nullable |
| created_at | datetime | not null, default now |

제약:

- `rating >= 1`
- `rating <= 5`

### tags

리뷰에 재사용되는 태그입니다.

| 컬럼 | 타입 | 제약 |
| --- | --- | --- |
| id | integer | PK |
| name | varchar(80) | not null, unique, index |

### review_tags

리뷰와 태그의 N:M 연결 테이블입니다.

| 컬럼 | 타입 | 제약 |
| --- | --- | --- |
| review_id | integer | PK, FK reviews.id |
| tag_id | integer | PK, FK tags.id |

## 인덱스

- `users.nickname`, `users.email`
- `locations.name`
- `group_buy_items.category_id`, `group_buy_items.location_id`, `group_buy_items.host_id`
- `chat_messages.item_id`, `chat_messages.sender_id`
- `notifications.recipient_id`
- `reviews.item_id`, `reviews.reviewer_id`, `reviews.host_id`
- `tags.name`

## 마이그레이션

| 리비전 | 내용 |
| --- | --- |
| `20260818_0001` | 사용자, 카테고리, 지역, 모집글 테이블 생성 |
| `20260818_0002` | 채팅, 알림, 리뷰, 태그 테이블 생성 |
| `20260818_0003` | 회원가입용 이메일, 비밀번호 해시 컬럼 추가 |

## 현재 제외된 항목

- 결제, 주문, 정산 테이블
- 참여 신청/참여자 목록 테이블
- Supabase Auth 연동 테이블
- 파일 업로드 저장소 메타데이터 테이블

위 항목은 실제 기능을 붙일 때 별도 마이그레이션으로 추가합니다.
