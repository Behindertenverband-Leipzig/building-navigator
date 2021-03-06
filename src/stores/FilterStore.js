/**
 * Add filters to filter buildings by a values of their keys
 * Each filter is stores as an object in this.filters
 * Support a search field, select-boxes and checkboxes
 */
class FilterStore {
    constructor(logger) {
        this.logger = logger;
        this.filters = [];

        // Add default filters with the following properties:
        //  id      (String) unique id for the filter
        //  type    (String) search|select-one|checkbox
        //  title   (String)
        //  icon    (Sring) Name of the SVG icon in dist/images/[name].svg
        //  aria    (String)
        //  valueSet (Array of Objects) Only if type is 'select-one', keys:
        //      key     (String) Key to filter
        //      value   (Integer|String) Value to filter
        //      title   (String)
        //      aria    (String)
        //  key     (String) (not for 'select-one') Key to filter (e.g. title, lift-avail)
        //  value   (Integer|String) Value of the filter, for 'select-one' its the number of the selected entry

        /*
         * Search by Name
         */
        this.add({
            id: 'search',
            type: 'search',
            title: 'Suche Gebäude',
            icon: 'search',
            aria: 'Gebäude nach Namen suchen',
            key: 'title',
            value: '',
        });

        /*
         * Entrance accessible
         */
        this.add({
            id: 'entrance',
            type: 'select-one',
            title: 'Eingang',
            icon: 'bvl/entrance',
            aria: 'Filter, Anforderungen an den Eingangsbereich',
            valueSet: [
                {key: 'entrance-suit-f-wheelchair', value: 0, title: 'keine Einschränkung', aria: 'Keine Anforderungen an den Eingangsbereich'},
                {key: 'entrance-suit-f-wheelchair', value: 1, title: 'ist teilweise rollstuhlgerecht', aria: 'Eingang ist teilweise rollstuhlgerecht'},
                {key: 'entrance-suit-f-wheelchair', value: 2, title: 'ist rollstuhlgerecht', aria: 'Eingang ist rollstuhlgerecht'},
            ],
            value: 0,
        });

        /*
         * Lift available and/or accessible
         */
        this.add({
            id: 'lift',
            type: 'select-one',
            title: 'Aufzug',
            icon: 'bvl/elevator',
            aria: 'Filter, Anforderungen an den Aufzug',
            valueSet: [
                {key: 'lift-avail', value: 0, title: 'keine Einschränkung', aria: 'Keine Anforderungen an den Aufzug'},
                {key: 'lift-avail', value: 1, title: 'ist vorhanden', aria: 'Aufzug is vorhanden'},
                {key: 'lift-suit-f-wheelchair', value: 1, title: 'ist rollstuhlgerecht', aria: 'Aufzug is rollstuhlgerecht'},
            ],
            value: 0,
        });

        /*
         * Toilet available and/or accessible
         */
        this.add({
            id: 'toilet',
            type: 'select-one',
            title: 'Toilette',
            icon: 'bvl/toilet',
            aria: 'Filter, Anforderungen an die Toilette',
            valueSet: [
                {key: 'toilet-avail', value: 0, title: 'keine Einschränkung', arai: 'Keine Anforderungen an die Toilette'},
                {key: 'toilet-avail', value: 1, title: 'ist vorhanden', aria: 'Toilette ist vorhanden'},
                {key: 'toilet-suit-f-wheelchair', value: 1, title: 'ist teilweise rollstuhlgerecht', aria: 'Toilette ist teilweise rollstuhlgerecht'},
                {key: 'toilet-suit-f-wheelchair', value: 2, title: 'ist rollstuhlgerecht', aria: 'Toilette ist rollstuhlgerecht'},
            ],
            value: 0,
        });

        /*
         * Parking available and/or accessible
         */
        this.add({
            id: 'parking',
            type: 'select-one',
            title: 'Parkplatz',
            icon: 'bvl/parking',
            aria: 'Filter, Anforderungen an den Parkplatz',
            valueSet: [
                {key: 'parking-avail', value: 0, title: 'keine Einschränkung', aria: 'Keine Anforderungen an den Parkplatz'},
                {key: 'parking-avail', value: 1, title: 'ist vorhanden', aria: 'Parkplatz ist vorhanden'},
                {key: 'parking-f-disabled-avail', value: 1, title: 'ist behindertengerecht', aria: 'Parkplatz ist behindertengerecht'},
            ],
            value: 0,
        });

        /*
         * Blind help
         */
        this.add({
            id: 'blind',
            type: 'checkbox',
            icon: 'bvl/blind-help',
            title: 'Hilfestellung für Sehgeschädigte',
            aria: 'Filter, Hilfestellung für Sehgeschädigte',
            key: 'help-for-blind',
            value: 0, // 0 - nicht vorhanden, 1 - vorhanden
        });
        /*
         * Hearing help
         */
        this.add({
            id: 'hearing',
            type: 'checkbox',
            icon: 'bvl/hearing-help',
            title: 'Hilfestellung für Hörgeschädigte',
            aria: 'Filter, Hilfestellung für Hörgeschädigte',
            key: 'help-for-hearing-imp',
            value: 0, // 0 - nicht vorhanden, 1 - vorhanden
        });
        /*
         * General help
         */
        this.add({
            id: 'general',
            type: 'checkbox',
            icon: 'bvl/general-help',
            title: 'Allgemeine Hilfestellung',
            aria: 'Filter, Allgemeine Hilfestellung',
            key: 'general-help',
            value: 0, // 0 - nicht vorhanden, 1 - vorhanden
        });
    }

    /**
     * Get all filters
     *
     * @return Array
     */
    getAll() {
        return this.filters;
    }

    /**
     * Get filter by its id
     *
     * @param {String}
     * @return {Objekt}
     */
    getFilter(id) {
        return this.getAll().find((filter) => {
            return filter.id == id;
        });
    }

    /**
     * Add new filter
     *
     * @param {Object}
     */
    add(filter) {
        this.filters.push(filter);
    }

    /**
     * Updates a filter by its key with a new selected-value.
     *
     * @param {String} Filter id
     * @param {Integer|String} Selected value of values sets, checkbox or input
     */
    update(id, value) {
        this.getAll().forEach((filter, fid) => {
            if (id == filter.id) {
                filter.value = value;
                return;
            }
        });
    }

    /**
     * Reset all filters und set to default values (see constructor)
     */
    resetAll() {
        const filterStore = new FilterStore();
        this.filters = filterStore.getAll();
    }
}

export default FilterStore;
