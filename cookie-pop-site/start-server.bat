@echo off
title Cookie POP preview server
cd /d "%~dp0"
echo Cookie POP preview: http://127.0.0.1:8080  (close this window to stop)
where py >nul 2>nul && (
  py -3 -m http.server 8080 --bind 127.0.0.1
  goto :end
)
where python >nul 2>nul && (
  python -m http.server 8080 --bind 127.0.0.1
  goto :end
)
echo Python was not found. Install it from https://www.python.org/downloads/ and try again.
:end
pause
