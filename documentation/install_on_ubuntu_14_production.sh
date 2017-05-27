git clone git@github.com:eonum/medcodelogic-frontend.git medcodesearch-frontend

sudo apt-get install python-software-properties
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install nodejs
# check versions
nodejs -v
npm -v

sudo npm install -g @angular/cli
ng -v

cd medcodesearch-frontend/
python generateVersions.py 
npm install
ng build -prod

cd /opt/nginx/conf/sites-available/
sudo vim medcodesearch 
#server {
#        # listen   80; ## listen for ipv4; this line is default and implied
#        #listen   [::]:80 default ipv6only=on; ## listen for ipv6
#        server_name medcodesearch.ch;
#        server_name www.medcodesearch.ch;
#        
#        root /home/tim/medcodesearch-frontend/dist/;
#        
#        index index.html;
# 
#        location / {
#                try_files $uri$args $uri$args/ /index.html;
#        }
#}


cd ../sites-enabled/
sudo ln -s ../sites-available/medcodesearch medcodesearch
sudo service nginx restart
