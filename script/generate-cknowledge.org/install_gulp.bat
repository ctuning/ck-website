rem find sources

call ck find wfe:cknowledge.org > tmp.tmp
set /p web_dir= < tmp.tmp
del tmp.tmp

cd %web_dir%

npm install gulp
