if [ "$1" == "" ] ; then
    echo "Oppgi telefonnummer som første parameter"
    exit 1
fi


curl -X POST --header "Accept: application/json" --header "LagKode: nedover_lia_triller_en_traktor" --header "DeltakerKode: 40041446" "https://bbr2015.azurewebsites.net/api/GameService/RykkTilbakeTilStart"

