# Build

```
docker build . -t ctf-logs-metrics-flag
```

# Run
```
docker run -p 8080:8080 -d -e FLAG='flag{MYAWESOMEFLAG}' --name ctf-logs-metrics-flag --rm ctf-logs-metrics-flag
```

# Get container ID
```
docker ps
```

# Print app output
```
docker logs <container id>
```

# App access
Running on http://localhost:8080

# Enter the container
```
docker exec -it <container id> /bin/bash
```

# Stop container
```
docker stop ctf-logs-metrics-flag
```