# Architecture

users Table

| Field             | Data Type | Nullable | Constraint  |
| ----------------- | --------- | -------- | ----------- |
| id                | INTEGER   | NOT NULL | PRIMARY KEY |
| name              | VARCHAR   | NOT NULL | FOREIGN KEY |
| birthdate         | DATETIME  | NOT NULL |             |
| discord_id        | VARCHAR   | NOT NULL |             |
| discord_url_image | VARCHAR   | NOT NULL |             |
| created_at        | DATETIME  | NOT NULL |             |
| updated_at        | DATETIME  | NULL     |             |

---

lol_matches Table

| Field        | Data Type | Nullable | Constraint  |
| ------------ | --------- | -------- | ----------- |
| id           | INTEGER   | NOT NULL | PRIMARY KEY |
| lol_match_id | VARCHAR   | NOT NULL | FOREIGN KEY |
| created_at   | DATETIME  | NOT NULL |             |
| updated_at   | DATETIME  | NULL     |             |

---

lol_whitelist_find_matches Table

| Field      | Data Type | Nullable | Constraint  |
| ---------- | --------- | -------- | ----------- |
| id         | INTEGER   | NOT NULL | PRIMARY KEY |
| lol_name   | VARCHAR   | NOT NULL | FOREIGN KEY |
| created_at | DATETIME  | NOT NULL |             |
| updated_at | DATETIME  | NULL     |             |

---
