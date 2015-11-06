curl -X POST --header "Content-Type: application/json" \
             --header "Accept: application/json" \
             --header "LagKode: nedover_lia_triller_en_traktor" \
             --header "DeltakerKode: 40041446" \
             "https://bbr2015.azurewebsites.net/api/GameService" \
             -d "{'postKode': 'Post1', 'bruktVåpen': 'BOMBE'}"
