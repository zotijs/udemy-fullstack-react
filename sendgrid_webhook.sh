function localtunnel {
  lt -s jljkb9865t --port 5000
}
until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done