/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

importScript("charts/aColor.js");


(function(){
	var green = Color.GREEN.multiply(0.5).hue(10).toHTML();
	var blue = Color.BLUE.multiply(0.5).hue(10).toHTML();
	var yellow = Color.RED.multiply(0.7).hue(-60).toHTML();
	var red = Color.RED.multiply(0.5).toHTML();


	window.Settings = {
		"imagePath" : "images",

		// POINTERS TO THE MANY SYSTEMS
		"indexes" : {

			// BUGZILLA TABLES (ElasticSearch Indexes)
			"bugs" : {"name" : "private bugs cluster", "style" : {"color" : "black", "background-color" : yellow}, "host" : "https://esfrontline-private-vip.bugs.scl3.mozilla.com:9200", "path" : "/private_bugs/bug_version"},
			"public_bugs" : {"name" : "Mozilla public bugs cluster", "style" : {"color" : "white", "background-color" : green}, "host" : "https://esfrontline.bugzilla.mozilla.org:443", "path" : "/public_bugs/bug_version"},
			"public_bugs_backend" : {"style" : {"color" : "black", "background-color" : yellow}, "host" : "http://elasticsearch1.bugs.scl3.mozilla.com:9200", "path" : "/public_bugs/bug_version"},
			"public_bugs_proxy" : {"style" : {"color" : "black", "background-color" : yellow}, "host" : "http://klahnakoski-es.corp.tor1.mozilla.com:9201", "path" : "/public_bugs/bug_version"},
			"public_comments" : {"style" : {"color" : "black", "background-color" : yellow}, "host" : "https://esfrontline.bugzilla.mozilla.org:443", "path" : "/public_comments/bug_comment"},
			"private_bugs" : {"style" : {"color" : "black", "background-color" : yellow}, "host" : "http://elasticsearch6.bugs.scl3.mozilla.com:9200", "path" : "/private_bugs/bug_version"},
			"private_comments" : {"style" : {"color" : "black", "background-color" : yellow}, "host" : "http://elasticsearch4.bugs.scl3.mozilla.com:9200", "path" : "/private_comments/bug_comment"},

			"tor_bugs" : {"style" : {"color" : "black", "background-color" : yellow}, "host" : "http://klahnakoski-es.corp.tor1.mozilla.com:9200", "path" : "/bugs/bug_version"},
			"tor_public_bugs" : {"style" : {"color" : "black", "background-color" : yellow}, "host" : "http://klahnakoski-es.corp.tor1.mozilla.com:9200", "path" : "/public_bugs/bug_version"},
			"tor_private_bugs" : {"style" : {"color" : "black", "background-color" : yellow}, "host" : "http://klahnakoski-es.corp.tor1.mozilla.com:9200", "path" : "/private_bugs/bug_version"},

			"bug_hierarchy" : {"style" : {"color" : "black", "background-color" : yellow}, "host" : "https://esfrontline-private-vip.bugs.scl3.mozilla.com:9200", "path" : "/bug_hierarchy/bug_hierarchy"},
			"bug_dependencies" : {"style" : {"color" : "black", "background-color" : yellow}, "host" : "https://esfrontline-private-vip.bugs.scl3.mozilla.com:9200", "path" : "/private_bugs/bug_version"},

			"public_bug_hierarchy" : {"style" : {"color" : "white", "background-color" : green}, "host" : "https://esfrontline.bugzilla.mozilla.org:443", "path" : "/bug_hierarchy/bug_hierarchy"},
			"public_bug_dependencies" : {"style" : {"color" : "white", "background-color" : green}, "host" : "https://esfrontline.bugzilla.mozilla.org:443", "path" : "/bug_hierarchy/bug_version"},


			//TODO: HAVE CODE SCAN SCHEMA FOR NESTED OPTIONS
			"public_bugs.changes" : {},
			"public_bugs.attachments" : {},
			"public_bugs.attachments.flags" : {},
			"private_bugs.changes" : {},
			"private_bugs.attachments" : {},
			"private_bugs.attachments.flags" : {},
			"bugs.changes" : {},
			"bugs.attachments" : {},
			"bugs.attachments.flags" : {},


			//        "reviews": {"style":{"color":"black","background-color":green}, "host": "http://klahnakoski-es.corp.tor1.mozilla.com:9200", "path": "/reviews/patch_review"},
			"public_reviews" : {"style" : {"color" : "white", "background-color" : green}, "host" : "https://esfrontline.bugzilla.mozilla.org:443", "path" : "/reviews/patch_review"},
			"reviews" : {"style" : {"color" : "black", "background-color" : yellow}, "host" : "https://esfrontline-private-vip.bugs.scl3.mozilla.com:9200", "path" : "/reviews/patch_review"},
			"bug_summary" : {"style" : {"color" : "black", "background-color" : yellow}, "host" : "https://esfrontline-private-vip.bugs.scl3.mozilla.com:9200", "path" : "/bug_summary/bug_summary"},
			"bug_tags" : {"style" : {"color" : "black", "background-color" : yellow}, "host" : "https://esfrontline-private-vip.bugs.scl3.mozilla.com:9200", "path" : "/bug_tags/bug_tags"},
			"org_chart" : {"style" : {"color" : "black", "background-color" : yellow}, "host" : "https://esfrontline-private-vip.bugs.scl3.mozilla.com:9200", "alias" : "org_chart", "path" : "/org_chart/person"},
			"temp" : {"style" : {"color" : "black", "background-color" : yellow}, "host" : "https://esfrontline-private-vip.bugs.scl3.mozilla.com:9200", "path" : ""},
			"telemetry" : {"style" : {"color" : "black", "background-color" : yellow}, "host" : "https://esfrontline-private-vip.bugs.scl3.mozilla.com:9200", "path" : "/telemetry_agg_valid_201305/data"},
			"raw_telemetry" : {"style" : {"color" : "black", "background-color" : yellow}, "host" : "http://klahnakoski-es.corp.tor1.mozilla.com:9200", "path" : "/raw_telemetry/data"},

//      "talos" : {"style" : {"color" : "black", "background-color" : yellow}, "host" : "http://klahnakoski-es.corp.tor1.mozilla.com:9200", "path" : "/talos/test_results"},
//      "kyle_talos" : {"style" : {"color" : "black", "background-color" : yellow}, "host" : "http://192.168.0.98:9200", "path" : "/talos/test_results"},
//      "local_talos" : {"style" : {"color" : "black", "background-color" : yellow}, "host" : "http://localhost:9200", "path" : "/talos/test_results"},
			"talos" : {"style" : {"color" : "black", "background-color" : yellow}, "host" : "http://klahnakoski-es.corp.tor1.mozilla.com:9200", "path" : "/talos/test_results"},
			"alt_talos" : {"style" : {"color" : "black", "background-color" : yellow}, "host" : "http://192.168.0.98:9200", "path" : "/talos/test_results"},
			"alt_talos2" : {"style" : {"color" : "black", "background-color" : yellow}, "host" : "http://192.168.0.98:9200", "path" : "/talos2/test_results"},
			"public_talos" : {"style" : {"color" : "black", "background-color" : yellow}, "host" : "http://67.55.30.33:9201", "path" : "/talos/test_results"},
			"local_talos" : {"style" : {"color" : "black", "background-color" : yellow}, "host" : "http://localhost:9200", "path" : "/talos/test_results"},

			"b2g_tests" : {"style" : {"color" : "black", "background-color" : yellow}, "host" : "https://esfrontline-private-vip.bugs.scl3.mozilla.com:9200", "path" : "/b2g_tests/results"},
			"b2g" : {"style" : {"color" : "black", "background-color" : yellow}, "host" : "https://esfrontline-private-vip.bugs.scl3.mozilla.com:9200", "path" : "/b2g_tests/results"},
			"public_b2g": {"style" : {"color" : "black", "background-color" : yellow}, "host" : "http://67.55.30.33:9201", "path" : "/b2g_tests/test_results"},
			"local_b2g": {"style" : {"color" : "black", "background-color" : yellow}, "host" : "http://192.168.0.98:9200", "path" : "/b2g_tests/test_results"},

			"perfy" : {"style" : {"color" : "black", "background-color" : yellow}, "host" : "https://esfrontline-private-vip.bugs.scl3.mozilla.com:9200", "path" : "/perfy/scores"},
			"local_perfy" : {"style" : {"background-color" : red}, "host" : "http://localhost:9200", "path" : "/perfy/scores"},

			"eideticker" : {"style" : {"background-color" : red}, "host" : "http://67.55.30.33:9201", "path" : "/eideticker/results"},


			// ACTIVE DATA TABLES
			"branches": {"style" : {"background-color" : blue}, "host" : "https://activedata.allizom.org", "table":"branches", "host_type":"ActiveData"},
			"jobs": {"style" : {"background-color" : blue}, "host" : "https://activedata.allizom.org", "table":"jobs", "host_type":"ActiveData"},
			"jobs.action.timings": {"style" : {"background-color" : blue}, "host" : "https://activedata.allizom.org", "table":"jobs.action.timings", "host_type":"ActiveData"},
			"local_jobs.action.timings": {"style" : {"background-color" : blue}, "host" : "http://localhost:5000", "table":"jobs.action.timings", "host_type":"ActiveData"},
			"timings": {"style" : {"background-color" : blue}, "host" : "https://activedata.allizom.org", "table":"jobs.action.timings", "host_type":"ActiveData"},
			"unittests": {"style" : {"background-color" : blue}, "host" : "https://activedata.allizom.org", "table":"unittest", "host_type":"ActiveData"},
			"perf": {"style" : {"background-color" : blue}, "host" : "https://activedata.allizom.org", "table":"perf", "host_type":"ActiveData"},
			"failures": {"style" : {"background-color" : blue}, "host" : "https://localhost", "table":"failures", "host_type":"ActiveData"}

		},

		//REGISTER GENERATORS THAT HANDLE qb QUERIES
		"host_types":{


		}

	};


	//GIVE ALL CLUSTERS NAMES AND IDS
	Map.forall(Settings.indexes, function(k, v){
		v._id=k;
		v.name=coalesce(v.name, k);
	});

	//TRY PRIVATE CLUSTER FIRST, THEN FALL BACK TO PUBLIC
	Settings.indexes.bugs.alternate = Settings.indexes.public_bugs;
	Settings.indexes.bug_hierarchy.alternate = Settings.indexes.public_bug_hierarchy;
	Settings.indexes.bug_dependencies.alternate = Settings.indexes.public_bug_dependencies;
	Settings.indexes.talos.alternate=Settings.indexes.public_talos;
	Settings.indexes.public_talos.alternate=Settings.indexes.alt_talos;
	Settings.indexes.b2g.alternate=Settings.indexes.public_b2g;
	Settings.indexes.public_b2g.alternate=Settings.indexes.local_b2g;
	Settings.indexes.reviews.alternate = Settings.indexes.public_reviews;



})();
