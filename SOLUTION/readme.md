# Solution

1. Access to `/`
2. Nothing special anywhere
3. Check `/robots.txt`
4. Try urls, `/metrics` works !
5. Can see url of requests !
6. Go to `/logsViewer`
7. See the filename of the flag is `my_fl4g.lol` but don't know what path ?
8. In `/robots.txt` there was a `/data/sensitive/xxxx` entry, maybe it is the path.
9. Go to `/mySecretPageLoginKikooLol` and enter full path
```
/data/sensitive/xxxxxxx/my_fl4g.lol
```
12. Get the flag

# Explanation/Help

Secure your logs, watch out what you put in robots.txt