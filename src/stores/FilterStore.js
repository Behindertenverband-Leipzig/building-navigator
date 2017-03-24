class FilterStore {
    constructor(logger) {
        this.logger = logger;
        this.filters = [];

        /*
         * Search by Name 
         */
        // this.add({
        //     uniqueKey: 'title',
        //     title: 'Suche',
        //     type: 'search'
        //     value: ''
        // })

        /*
         * Entrance accessible
         */
        this.add({
            id: 'entrance',
            type: 'select-one',
            title: 'Eingang',
            icon: 'universal-access',
            aria: 'Aktueller Filter, Anforderungen an den Eingangsbereich',
            valueSet: [
                {title: 'keine Einschränkung', key: 'entrance-suit-f-wheelchair', value: 0},
                {title: 'ist teilweise rollstuhlgerecht', key: 'entrance-suit-f-wheelchair', value: 1},
                {title: 'ist rollstuhlgerecht', key: 'entrance-suit-f-wheelchair', value: 2},
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
            icon: 'elevator',
            aria: 'Aktueller Filter, Anforderungen an den Aufzug',
            valueSet: [
                {title: 'keine Einschränkung', key: 'lift-avail', value: 0},
                {title: 'ist vorhanden', key: 'lift-avail', value: 1},
                {title: 'ist barrierefrei', key: 'lift-suit-f-wheelchair', value: 1},
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
            icon: 'male-female',
            aria: 'Aktueller Filter, Anforderungen an die Toilette',
            valueSet: [
                {title: 'keine Einschränkung', key: 'toilet-avail', value: 0},
                {title: 'ist vorhanden', key: 'toilet-avail', value: 1},
                {title: 'ist teilweise rollstuhlgerecht', key: 'toilet-suit-f-wheelchair', value: 1},
                {title: 'ist rollstuhlgerecht', key: 'toilet-suit-f-wheelchair', value: 2},
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
            aria: 'Aktueller Filter, Anforderungen an den Parkplatz',
            valueSet: [
                {title: 'keine Einschränkung', key: 'parking-avail', value: 0},
                {title: 'ist vorhanden', key: 'parking-avail', value: 1},
                {title: 'ist behindertengerecht', key: 'parking-f-disabled-avail', value: 1},
            ],
            value: 0,
        });

        /*
         * Blind help
         */ 
        this.add({
            id: 'blind',
            type: 'checkbox',
            title: 'Hilfestellung für Sehgeschädigte',
            aria: 'Hilfestellung für Sehgeschädigte',
            key: 'help-for-blind',
            value: 0, // 0 - nicht vorhanden, 1 - vorhanden
        });
        /*
         * Hearing help
         */ 
        this.add({
            id: 'hearing',
            type: 'checkbox',
            title: 'Hilfestellung für Hörgeschädigte',
            aria: 'Hilfestellung für Hörgeschädigte',
            key: 'help-for-hearing-imp',
            value: 0, // 0 - nicht vorhanden, 1 - vorhanden
        });
        /*
         * General help
         */ 
        this.add({
            id: 'general',
            type: 'checkbox',
            title: 'Allgemeine Hilfestellung',
            aria: 'Allgemeine Hilfestellung',
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
        // @todo this is may bad code?
        const filterStore = new FilterStore();
        this.filters = filterStore.getAll();
    }
}

export default FilterStore;
