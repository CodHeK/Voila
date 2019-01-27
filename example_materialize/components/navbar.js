module.exports.nav = () => {
	return [
	    	{
	    		div: [
	    			{
	    				class: "nav-wrapper",
	    				a:[
	    					{
	    						href: "#",
	    						class: "brand-logo"
	    					}
	    				],
	    				ul:[
	    					{
	    						id: 'nav-mobile',
	    						class: 'right hide-on-med-and-down',
	    						li:[
	    							{
	    								a:[
	    									{
	    										href:'#',
	    										value:'Link1'
	    									}
	    								]
	    							},
	    							{
	    								a:[
	    									{
	    										href:'#',
	    										value:'Link2'
	    									}
	    								]
	    							}
	    						]
	    					}
	    				]
	    			}
	    		]
	        }
        ]
}