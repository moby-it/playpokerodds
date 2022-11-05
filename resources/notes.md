# Dev TODO
- Change poker engine to poker-odds-machine (DONE)
- Implement login, register and change username (DONE)
- Record and implement landing video (DONE)
- Create leaderboards (DONE)
- Admin
    - Create role db schema
        - roles are user, superuser, admin
    - Create admin endpoints
    - Create Admin screen with basic stats
    - Enable admin to add a user to admins

# Integration
- There is a problem with loop speed when calculating odds. 
    - Test if operations is faster with azure functions. IT IS (Transfered logic to azure functions with calc-odds-api solution)
