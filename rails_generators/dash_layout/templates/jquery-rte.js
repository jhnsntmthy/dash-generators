/*
 * jQuery RTE plugin 0.2 - create a rich text form for Mozilla, Opera, and Internet Explorer
 *
 * Copyright (c) 2007 Batiste Bieler
 * Distributed under the GPL (GPL-LICENSE.txt) licenses.
 */

// define the rte light plugin
jQuery.fn.rte = function(css_url) {

    if(document.designMode || document.contentEditable)
    {
        $(this).each( function(){
            var textarea = $(this);
            enableDesignMode(textarea);
        });
    }
    
    function formatText(iframe, command, option) {
        iframe.contentWindow.focus();
        try{
            iframe.contentWindow.document.execCommand(command, false, option);
        }catch(e){console.log(e)}
        iframe.contentWindow.focus();
    }
    
    function tryEnableDesignMode(iframe, doc, callback) {
        try {
            iframe.contentWindow.document.open();
            iframe.contentWindow.document.write(doc);
            iframe.contentWindow.document.close();
        } catch(error) {
            console.log(error)
        }
        if (document.contentEditable) {
            iframe.contentWindow.document.designMode = "On";
            callback();
            return true;
        }
        else if (document.designMode != null) {
            try {
                iframe.contentWindow.document.designMode = "on";
                callback();
                return true;
            } catch (error) {
                console.log(error)
            }
        }
        setTimeout(function(){tryEnableDesignMode(iframe, doc, callback)}, 250);
        return false;
    }
    
    function enableDesignMode(textarea) {
        // need to be created this way
        var iframe = document.createElement("iframe");
        iframe.frameBorder=1;
        iframe.frameMargin=5;
        iframe.framePadding=5;
        if(textarea.attr('class'))
            iframe.className = textarea.attr('class');
        if(textarea.attr('id'))
            iframe.id = textarea.attr('id');
        if(textarea.attr('name'))
            iframe.title = textarea.attr('name');
        textarea.after(iframe);
        var css = "";
        if(css_url)
            var css = "<link type='text/css' rel='stylesheet' href='"+css_url+"' />"
        var content = textarea.val();
        // Mozilla need this to display caret
        if($.trim(content)=='')
            content = '<br>';
        var doc = "<html><head>"+css+"</head><body class='frameBody'>"+content+"</body></html>";
        tryEnableDesignMode(iframe, doc, function() {
            $(iframe).before(toolbar(iframe));
            textarea.remove();
        });
    }
    
    function disableDesignMode(iframe, submit) {
        var content = iframe.contentWindow.document.getElementsByTagName("body")[0].innerHTML;
        if(submit==true)
            var textarea = $('<input type="hidden" />');
        else
            var textarea = $('<textarea></textarea>');
        textarea.val(content);
        t = textarea.get(0);
        if(iframe.className)
            t.className = iframe.className;
        if(iframe.id)
            t.id = iframe.id;
        if(iframe.title)
            t.name = iframe.title;
        $(iframe).before(textarea);
        if(submit!=true)
            $(iframe).remove();
    }
    
    function toolbar(iframe) {
        var tb = $("<div class='rte-toolbar'><div>\
            <p>\
                <select>\
                    <option value=''>Bloc style</option>\
                    <option value='p'>Paragraph</option>\
                    <option value='h3'>Title</option>\
                </select>\
            </p>\
            <p>\
                <a href='#' class='bold'><img src='/images/text_bold.png' alt='bold' /></a>\
                <a href='#' class='italic'><img src='/images/text_italic.png' alt='italic' /></a>\
            </p>\
            <p>\
                <a href='#' class='unorderedlist'><img src='/images/text_list_bullets.png' alt='unordered list' /></a>\
                <a href='#' class='link'><img src='/images/link_edit.png' alt='link' /></a>\
                <a href='#' class='image'><img src='/images/image_link.png' alt='image' /></a>\
                <a href='#' class='disable'><img src='/images/script_edit.png' alt='close rte' /></a>\
            </p></div></div>");
        $('select', tb).change(function(){
            var index = this.selectedIndex;
            if( index!=0 ) {
                var selected = this.options[index].value;
                formatText(iframe, "formatblock", '<'+selected+'>');
            }
        });
        $('.bold', tb).click(function(){ formatText(iframe, 'bold');return false; });
        $('.italic', tb).click(function(){ formatText(iframe, 'italic');return false; });
        $('.unorderedlist', tb).click(function(){ formatText(iframe, 'insertunorderedlist');return false; });
        $('.link', tb).click(function(){ 
            var p=prompt("URL:");
            if(p)
                formatText(iframe, 'CreateLink', p);
            return false; });
        $('.image', tb).click(function(){ 
            var p=prompt("image URL:");
            if(p)
                formatText(iframe, 'InsertImage', p);
            return false; });
        $('.disable', tb).click(function(){ disableDesignMode(iframe); tb.remove(); return false; });
        $(iframe).parents('form').submit(function(){ 
            disableDesignMode(iframe, true); });
        var iframeDoc = $(iframe.contentWindow.document);
        
        var select = $('select', tb)[0];
        iframeDoc.mouseup(function(){ setSelectedType(getSelectionElement(iframe), select);return true;});
        iframeDoc.keyup(function(){ setSelectedType(getSelectionElement(iframe), select);return true;});
        
        return tb;
    }
        
    function setSelectedType(node, select) {
        while(node.parentNode) {
            var nName = node.nodeName.toLowerCase();
            for(var i=0;i<select.options.length;i++) {
                if(nName==select.options[i].value){
                    select.selectedIndex=i;
                    return true;
                }
            }
            node = node.parentNode;
        }
        select.selectedIndex=0;
        return true;
    }
    
    function getSelectionElement(iframe) {
        if (iframe.contentWindow.document.selection) {
            // IE selections
            selection = iframe.contentWindow.document.selection;
            range = selection.createRange();
            try {
                node = range.parentElement();
            }
            catch (e) {
                return false;
            }
        } else {
            // Mozilla selections
            try {
                selection = iframe.contentWindow.getSelection();
                range = selection.getRangeAt(0);
            }
            catch(e){
                return false;
            }
            node = range.commonAncestorContainer;
        }
        return node;
    }
}
