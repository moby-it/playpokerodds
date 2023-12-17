wrk.method = "POST"
wrk.body   = '{"round":{"board":[],"myHand":["4s","7s"],"opponentsHands":[["9c","Qh"]]},"estimate":12}'
wrk.headers["Content-Type"] = "application/json"
wrk.headers["Authentication"]="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmNjlhNzY3OC1jMzM4LTQwODMtYmJlMi1kZWQyYjUzZWQxYWEiLCJlbWFpbCI6ImdzcGFub3NAbW9ieS1pdC5jb20iLCJyb2xlIjowLCJpYXQiOjE3MDI4MTAzNzQsImV4cCI6MTcwMzE1NTk3NH0.r3p-86RbPIaKFWQ4e5mlVGJzyboY2eXcTFRc55MKbbk"
