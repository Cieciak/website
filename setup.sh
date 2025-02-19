if [ -d .venv ]; then
  echo "Python venv alredy exists"
else
  python3 -m venv .venv
fi
source .venv/bin/activate
pip3 install -r requirements.txt