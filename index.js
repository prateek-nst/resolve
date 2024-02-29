import URI from "./URI.js";

const routes = [
	{
        name: 'signUp',
		path: '/sign-up/:token',
	},
	{
        name: 'createPassword',
		path: '/create-password/:token',	
	},
	{
        name: 'resetPassword',
		path: '/reset-password/:token',
	},
	{
        name: 'emailConfirm',
		path: '/email-confirm',
	},
	{
        name: "forgotPassword",
		path: '/forgot-password',
	},
	{
		path: '/nbfc/panel/*',
		children: [
			{
                name: "nbfcDashboard",
				path: 'dashboard',
			},
			{
                name: "nbfcLoanPoolDashboard",
				path: 'lpc',
			},
        ]
    }
];

function buildURLMapping(routes){
    const urlMapping = {};

    function helper(baseUrl = "", routes){
        for (const route of routes) {
            if(route.children == undefined || route.children.length === 0){
                if(route.name){
                    urlMapping[route.name] = baseUrl + route.path;
                }
            } else {
                const currentBaseUrl = route.path.slice(0, -1); 
                helper(currentBaseUrl, route.children);
            }
        }
    }

    helper("", routes);
    return urlMapping;
}

function resolve(name, params){
    if(!URL_MAPPING[name]){
        throw new Error(`No mapping found for identifier "${name}".`);
    }

    return new URI(URL_MAPPING[name])
                .withPathVariable(params).toString();
}

const URL_MAPPING = buildURLMapping(routes);


console.log(URL_MAPPING);
console.log(resolve("emailConfirm"));
console.log(resolve("signUp", {token: 123}));
console.log(resolve("nbfcLoanPoolDashboard"))
