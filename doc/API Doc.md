# API Doc

## HTTP status codes

| Code | Meaning                   | Description                                                  |
| ---- | ------------------------- | ------------------------------------------------------------ |
| 200  | OK                        | This is most commonly used HTTP code to show that the operation performed is successful |
| 201  | CREATED                   | This can be used when you use POST method to create a new resource |
| 202  | ACCEPTED                  | This can be used to acknowledge the request sent to the server |
| 400  | BAD REQUEST               | This can be used when client side input validation fails     |
| 401  | UNAUTHORIZED              | This can be used if the user or the system is not authorized to perform certain operation |
| 403  | FORBIDDEN                 | Same as UNAUTHORIZED                                         |
| 404  | NOT FOUND                 | This can be used if you are looking for certain resource and it is not available in the system |
| 500  | **INTERNAL SERVER ERROR** | This should never be thrown explicitly but might occur if the system fails |
| 502  | **BAD GATEWAY**           | This can be used if server received an invalid response from the upstream server |



## API Routes

Each path is prefixed with `/api`



### Authentication

| HTTP Request | Path    | Description                       | Body               |
| ------------ | ------- | --------------------------------- | ------------------ |
| POST         | /login  | Log in with username and password | username, password |
| GET          | /logout | Log out user                      | None               |

### Accounts

| HTTP Request | Path             | Description          | Body         |
| ------------ | ---------------- | -------------------- | ------------ |
| GET          | /accounts        | List all accounts    | None         |
| GET          | /accounts/:id    | Get account by id    | None         |
| GET          | /accounts/:token | Get account by token | None         |
| POST         | /accounts        | Add an account       | Account JSON |
| PUT          | /accounts/:id    | Modify an account    | Account JSON |
| DELETE       | /accounts/:id    | Delete an account    | None         |

### Answers

| HTTP Request | Path                                             | Description                              | Body      |
| ------------ | ------------------------------------------------ | ---------------------------------------- | --------- |
| GET          | /answers                                         | List all answers                         | None      |
| GET          | /answers/account/:accountId/question/:questionId | Get answer by accountId and questionId   | None      |
| GET          | /answers/account/:accountId/form/:formId         | List answers by accountId and formId     | None      |
| GET          | /answers/account/:accountId/form/latest          | List answer by accountId for latest form | None      |
| POST         | /answers                                         | Add an answer                            | Form JSON |
| PUT          | /answers/account/:accountId/question/:questionId | Modify an answer                         | Form JSON |
| DELETE       | /answers/account/:accountId/question/:questionId | Delete an answer                         | None      |

### Forms

| HTTP Request | Path                        | Description                    | Body      |
| ------------ | --------------------------- | ------------------------------ | --------- |
| GET          | /forms                      | List all forms                 | None      |
| GET          | /forms/:id                  | Get form by id                 | None      |
| GET          | /forms/latest               | Get latest form                | None      |
| ~~GET~~      | ~~/forms/latest/questions~~ | ~~List latest form questions~~ | ~~None~~  |
| POST         | /forms                      | Add an form                    | Form JSON |
| PUT          | /forms/:id                  | Modify an form                 | Form JSON |
| DELETE       | /forms/:id                  | Delete an form                 | None      |

### Matches

| HTTP Request | Path                                                 | Description                             | Body       |
| ------------ | ---------------------------------------------------- | --------------------------------------- | ---------- |
| GET          | /matches                                             | List all matches                        | None       |
| GET          | /matches/godfather/:godfatherId/laureate/:laureateId | Get match by godfatherId and laureateId | None       |
| GET          | /matches/godfather/:godfatherId                      | List matches by godfatherId             | None       |
| GET          | /matches/laureate/:laureateId                        | List matches by laureateId              | None       |
| POST         | /matches                                             | Add an match                            | Match JSON |
| PUT          | /matches/godfather/:godfatherId/laureate/:laureateId | Modify a match                          | Match JSON |
| DELETE       | /matches/godfather/:godfatherId/laureate/:laureateId | Delete a match                          | None       |

### Meetings

| HTTP Request | Path                                                  | Description                             | Body         |
| ------------ | ----------------------------------------------------- | --------------------------------------- | ------------ |
| GET          | /meetings                                             | List all meetings                       | None         |
| GET          | /meetings/godfather/:godfatherId/laureate/:laureateId | Get match by godfatherId and laureateId | None         |
| GET          | /meetings/godfather/:godfatherId                      | List meetings by godfatherId            | None         |
| GET          | /meetings/laureate/:laureateId                        | List meetings by laureateId             | None         |
| POST         | /meetings                                             | Add a meeting                           | Meeting JSON |
| PUT          | /meetings/godfather/:godfatherId/laureate/:laureateId | Modify a meeting                        | Meeting JSON |
| DELETE       | /meetings/godfather/:godfatherId/laureate/:laureateId | Delete a meeting                        | None         |

### Preselections

| HTTP Request | Path                                                       | Description                             | Body              |
| ------------ | ---------------------------------------------------------- | --------------------------------------- | ----------------- |
| GET          | /preselections                                             | List all preselections                  | None              |
| GET          | /preselections/godfather/:godfatherId/laureate/:laureateId | Get match by godfatherId and laureateId | None              |
| GET          | /preselections/godfather/:godfatherId                      | List preselections by godfatherId       | None              |
| GET          | /preselections/laureate/:laureateId                        | List preselections by laureateId        | None              |
| POST         | /preselections                                             | Add an preselection                     | Preselection JSON |
| PUT          | /preselections/godfather/:godfatherId/laureate/:laureateId | Modify an preselection                  | Preselection JSON |
| DELETE       | /preselections/godfather/:godfatherId/laureate/:laureateId | Delete an preselection                  | None              |

### Questions

| HTTP Request | Path                    | Description                        | Body          |
| ------------ | ----------------------- | ---------------------------------- | ------------- |
| GET          | /questions              | List all questions                 | None          |
| GET          | /questions/:id          | Return question with a specific id | None          |
| GET          | /questions/form/:formId | List questions by formId           | None          |
| GET          | /questions/form/latest  | List answer for latest form        | None          |
| POST         | /questions              | Add an question                    | Question JSON |
| PUT          | /questions/:id          | Modify an question                 | Question JSON |
| DELETE       | /questions/:id          | Delete an question                 | None          |

