rem find sources

call ck find wfe:cknowledge.org > tmp.tmp
set /p web_dir= < tmp.tmp
del tmp.tmp

rem find widget

call ck find wfe:dashboard > tmp.tmp
set /p dashboard_dir= < tmp.tmp
del tmp.tmp

rem go to sources

cd %web_dir%

rem delete ck-repo-widget

cd src
rmdir /Q /s ck-repo-widget
mkdir ck-repo-widget
cd ..

rem copy ck-repo-widget from ck-web
xcopy /s %dashboard_dir%\ck-repo-widget\* src\ck-repo-widget

call gulp ck
