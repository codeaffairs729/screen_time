# Create the .env file based on the secrets provided by gitlab
echo NEXT_PUBLIC_API_ROOT=$NEXT_PUBLIC_API_ROOT >> .env
echo NEXT_PUBLIC_DASHBOARD_API_ROOT=$NEXT_PUBLIC_DASHBOARD_API_ROOT >> .env
