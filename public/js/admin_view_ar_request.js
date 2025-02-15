$(document).ready(function(){
    $('#jd_table').DataTable({
        language: {
            'paginate': {
                'previous': '<span class="fa fa-chevron-left"></span>',
                'next': '<span class="fa fa-chevron-right"></span>'
            },
            "lengthMenu": 'Display <select class="form-control input-sm mt-2">'+
            '<option value="10">10</option>'+
            '<option value="20">20</option>'+
            '<option value="30">30</option>'+
            '<option value="40">40</option>'+
            '<option value="50">50</option>'+
            '<option value="-1">All</option>'+
            '</select> results'
        },
        "columnDefs": [
            { 
                "orderable": false, 
                "targets": [0,1,2,3,4,5],
                "className": "no-sorting"
            }
        ],
        "order": [[0, 'desc']], 
        initComplete: function() {   
            $(".no-sorting").removeClass('sorting_asc');
        }
    });
});
