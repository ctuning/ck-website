# find sources

web_dir=`ck find wfe:cknowledge.org`

# find widget

dashboard_dir=`ck find wfe:dashboard`

# go to sources

cd $web_dir

# delete ck-repo-widget

cd src
rm -rf ck-repo-widget
mkdir ck-repo-widget
cd ..

# copy ck-repo-widget from ck-web
cp -rf $dashboard_dir/ck-repo-widget/* src/ck-repo-widget

gulp ck
