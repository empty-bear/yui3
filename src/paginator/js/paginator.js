/**
 A collection of generic paginator methods and properties.

 @module paginator
 @main paginator
 @class Paginator
 @since 3.10.0
 */
 var Paginator = Y.Base.create('paginator', Y.Base, [], {

    /**
     Sets the page to the first page in the set.
     @method firstPage
     */
    firstPage: function () {
        this.set('page', 1);
        return this;
    },

    /**
     Sets the page to the last page in the set.
     Goes to next page if totalItems is not set.
     @method lastPage
     */
    lastPage: function () {
        if (this.hasNextPage()) {
            if (this.get('totalItems')) {
                this.set('page', this.get('totalPages'));
            } else {
                this.nextPage();
            }
        }
        return this;
    },

    /**
     Sets the page to the previous page in the set.
     @method prevPage
     */
    prevPage: function () {
        if (this.hasPrevPage()) {
            this.set('page', this.get('page') - 1);
        }
        return this;
    },

    /**
     Sets the page to the next page in the set.
     @method nextPage
     */
    nextPage: function () {
        if (this.hasNextPage()) {
            this.set('page', this.get('page') + 1);
        }
        return this;
    },

    /**
     Returns True if there is a previous page in the set.
     @method hasPrevPage
     @return {Boolean} `true` if there is a previous page, `false` otherwise.
     */
    hasPrevPage: function () {
        return this.get('page') > 1;
    },

    /**
     Returns True if there is a next page in the set.

     If totalItems isn't set, assume there is always next page;

     @method hasNextPage
     @return {Boolean} `true` if there is a next page, `false` otherwise.
     */
    hasNextPage: function () {
        return (!this.get('totalItems') || this.get('page') < this.get('totalPages'));
    },


    //--- P R O T E C T E D

    /**
     Returns the total number of pages based on the total number of
       items provided and the number of items per page
     @protected
     @method _getTotalPagesFn
     @return Number
     */
    _getTotalPagesFn: function () {
        var itemsPerPage = this.get('itemsPerPage');

        return (itemsPerPage < 1) ? 1 : Math.ceil(this.get('totalItems') / itemsPerPage);
    }


}, {
    ATTRS: {
        /**
         Current page count. First page is 1.
         @attribute page
         @type Number
         @default 1
         **/
        page: {
            value: 1
        },

        /**
         Total number of pages to display
         @readOnly
         @attribute totalPages
         @type Number
         **/
        totalPages: {
            readOnly: true,
            getter: '_getTotalPagesFn'
        },

        /**
         Maximum number of items per page. A value of negative one (-1) indicates
             all items on one page.
         @attribute itemsPerPage
         @type Number
         @default 10
         **/
        itemsPerPage: {
            value: 10
        },

        /**
         Total number of items in all pages.
         @attribute totalItems
         @type Number
         @default 0
         **/
        totalItems: {
            value: 0
        }
    }
});

Y.Paginator = Paginator;