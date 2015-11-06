if [ "$1" == "" ] ; then
    echo "Oppgi telefonnummer som første parameter"
    exit 1
fi
if [ "$2" == "" ] ; then
    echo "Oppgi latitude som andre parameter"
    exit 1
fi
if [ "$3" == "" ] ; then
    echo "Oppgi longitude som tredje parameter"
    exit 1
fi

curl -X POST --header "Content-Type: application/json" \
             --header "Accept: application/json" \
             --header "LagKode: nedover_lia_triller_en_traktor" \
             --header "DeltakerKode: $1" \
             -d "{ \"latitude\": \"$2\", \"longitude\": \"$3\" }" \
             "https://bbr2015.azurewebsites.net/api/PosisjonsService"