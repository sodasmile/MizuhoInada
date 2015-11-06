curl -X GET --header "Content-Type: application/json" \
            --header "Accept: application/json" \
            --header "LagKode: nedover_lia_triller_en_traktor" \
            --header "DeltakerKode: 95084074" \
            "https://bbr2015.azurewebsites.net/api/PosisjonsService" \
            | python -m json.tool
