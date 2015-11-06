curl -v -X POST --header "Content-Type: application/json" \
             --header "Accept: application/json" \
             --header "LagKode: nedover_lia_triller_en_traktor" \
             --header "DeltakerKode: 40041446" \
             -d "{ \"latitude\": 14, \"longitude\": 432 }" \
             "https://bbr2015.azurewebsites.net/api/PosisjonsService"