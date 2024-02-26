# How to Stress Test 

Instructions on how to stress test the calculations part of the playpokerodds app.

## Important bash Files

There are 2 important `.sh` files in this folder - the `sample_curl.sh` and the `stress_test.sh`.

`sample_curl.sh` file sends a curl request to the given url.

**Example**

bash console: `cat example-url.txt | xargs ./sample_curl.sh`

Expected output: `{"odds":38.32}Total time: 1.297589s`

Similarly with the above, `stress_test.sh` uses [wrk](https://github.com/wg/wrk) to benchmark the give endpoint. Again, similarly:

bash console: `cat example-url.txt | xargs ./stress_test.sh`

Expected output: <pre>Running 30s test @ https://calc.playpokerodds.com/api/calcOdds
  4 threads and 4 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     1.24s   325.53ms   1.98s    73.40%
    Req/Sec     0.15      0.36     1.00     85.11%
  94 requests in 30.06s, 22.66KB read
Requests/sec:      3.13
Transfer/sec:     771.84B</pre>

## Creating your own txt files

The way I stress test this is via creating multiple .txt files and throwing them into the `stress_test.sh` script. For example, if I have an IP that has the calc api deployed, I do `echo http://123.123.123.123 > hosting-provider-url.txt`. This way I can do `cat hosting-provider-url.txt | xargs ./stress_test` and run a stress test for the given url.