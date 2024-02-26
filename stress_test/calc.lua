wrk.method = "POST"
wrk.body   = '{"round":{"board":[],"myHand":["4s","7s"],"opponentsHands":[["9c","Qh"]]},"estimate":12}'
wrk.headers["Content-Type"] = "application/json"
wrk.headers["Authentication"]="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZWEyMjQ3NC0wM2ExLTQ2OWMtYjg3My1kNDY5NzcwYzMxMjgiLCJlbWFpbCI6Imdlc3BhMTEwMTlAZ21haWwuY29tIiwicm9sZSI6MiwiaWF0IjoxNjk0Nzg2OTkzLCJleHAiOjE2OTUxMzI1OTN9.JCjlTMU4awkmm7biTCqEyY5xpMJReyvfHxVKFCvwGeE"
