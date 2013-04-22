/**
 * 0xor1    https://github.com/0xor1
 * Date:    20/04/2013
 */

(function(NS){


    var ns = window[NS] = window[NS] || {}
        , rs
        ;

    ns.rs = {};
    rs = ns.rs;
    rs._ = '_';
    rs.id = 'id';
    rs.usageCount = 'usageCount';
    rs.prfx = rs._ + NS + rs._;
    rs.fnId = rs.prfx + rs.id;
    rs.fnUsageCount = rs.prfx + rs.usageCount;


})(NS);