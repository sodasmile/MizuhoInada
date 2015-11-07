if [ "$2" == "" ] ; then
    echo "Oppgi post som andre parameter"
    exit 1
fi

curl -X POST --header "Content-Type: application/json" \
             --header "Accept: application/json" \
             --header "LagKode: nedover_lia_triller_en_traktor" \
             --header "DeltakerKode: $1" \
             "https://bbr2015.azurewebsites.net/api/GameService" \
             -d "{'postKode': '$2', 'bruktVåpen': '$3'}"
