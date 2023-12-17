curl https://playpokerodds.192.168.49.2.nip.io/api/poker/postNewRoundAnswer \
-X POST \
-H 'Authentication: Bearer bGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmNjlhNzY3OC1jMzM4LTQwODMtYmJlMi1kZWQyYjUzZWQxYWEiLCJlbWFpbCI6ImdzcGFub3NAbW9ieS1pdC5jb20iLCJyb2xlIjowLCJpYXQiOjE3MDI4MTA0NjUsImV4cCI6MTcwMzE1NjA2NX0.diCT-n-meGf7YD1qwYskPrlTOmD3iqfsoGjUe2jUvXg' \
-H 'Content-Type: application/json' \
-d '{"round":{"board":[],"myHand":["4s","7s"],"opponentsHands":[["9c","Qh"]]},"estimate":12}' \
--insecure 
