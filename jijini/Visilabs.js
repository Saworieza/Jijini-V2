
var	_VLVisitChecked		= false;
var	_PageLoadStart		= new Date();
var	_PageLoadFinish		= null;
var	_SendPageLoadTime	= false;

if(_SendPageLoadTime){

	if(window.attachEvent){

		window.attachEvent("onload", function(){_PageLoadFinish = new Date();});
	}
	else{

		window.addEventListener("load", function(){_PageLoadFinish = new Date();}, false);
	}
}

function Visilabs(){

	this.NReferrer			= null;
	this.CookieID			= null;
	this.ReferrerURI		= null;
	this.NewCookieTimeout	= 1000;
	this.TD					= 1440000;
	this.VisitTimeout		= 30;
	this.OrganizationID		= "545055666B51563258686F3D";
	this.SiteID				= "78735834316C79575331383D";
	this.DataSource			= "siemenscomtr";
	this.SegmentURL			= "weblogger.visilabs.com/";
	this.TargetURL			= "s.visilabs.com/";
	this.RealtimeURL		= "rt.visilabs.com/";
	this.Parameters			= new Object();
	this.URI				= parseUri(this.ClearURL(document.location.href.toString()));
	this.IsNew				= false;
	this.DownloadExtensions	= new Array("xls", "xlsx", "pdf", "doc", "docx", "csv");
	this.ReferrerParameters	= new Array("glcid", "gclid", "q", "p", "text", "z", "wd");
	this.SearchEngines		= new Array(new SEngine("google.", "q"), new SEngine("bing.", "q"), new SEngine("yahoo.", "p"), new SEngine("yandex.", "text"), new SEngine("msn.", "q"), new SEngine("baidu.", "wd"), new SEngine("doubleclick.", "z"), new SEngine("ask.", "q"));
	this.CookieParams		= new Array(new VL_CP("OM.OSS", "OM_OSS", 1, "OM.voss", this.TD, false, null, false),
										new VL_CP("OM.cname", "OM_cname", 1, "OM.vcname", this.TD, false, null, false),
										new VL_CP("OM.cmedium", "OM_cmedium", 1, "OM.vcmedium", this.TD, false, null, false),
										new VL_CP("OM.csource", "OM_csource", 1, "OM.vcsource", this.TD, false, null, false),
										new VL_CP("OM.vseg1", "OM_vseg1", 1, "OM.vseg1", this.TD, false, null, false),
										new VL_CP("OM.vseg2", "OM_vseg2", 1, "OM.vseg2", this.TD, false, null, false),
										new VL_CP("OM.vseg3", "OM_vseg3", 1, "OM.vseg3", this.TD, false, null, false),
										new VL_CP("OM.vseg4", "OM_vseg4", 1, "OM.vseg4", this.TD, false, null, false),
										new VL_CP("OM.vseg5", "OM_vseg5", 1, "OM.vseg5", this.TD, false, null, false),
										new VL_CP("OM.bd", "OM_bd", 1, "OM.bd", this.TD, false, null, false),
										new VL_CP("OM.gn", "OM_gn", 1, "OM.gn", this.TD, false, null, false),
										new VL_CP("OM.loc", "OM_loc", 1, "OM.loc", this.TD, false, null, false),
										new VL_CP("OM.pv", "OM_pv", 1, "OM.vpv", this.TD, false, null, false),
										new VL_CP("OM.pv", "OM_lpvs", 10, "OM.lpvs", this.TD, true, null, false),
										new VL_CP("OM.pp", "OM_lpp", 1, "OM.lpp", this.TD, true, ["OM.ppr"], false),
										new VL_CP("OM.q", "OM_q", 1, "OM.vq", this.TD, false, null, false),
										new VL_CP("OM.rDomain", "OM_rDomain", 1, "OM.vrDomain", this.TD, false, null, false),
										new VL_CP("emocid", "vl_em_cid", 1, "em_cid", 43200, false, null, false),
										new VL_CP("emomid", "_ExVID", 1, "OM.exVisitorID", this.TD, false, null, false)
										);
	
	if(document.referrer && document.referrer.toString() != ""){
	
		this.ReferrerURI = parseUri(this.ClearURL(document.referrer.toString()));
		this.CollectSearchEngines();
		this.CreateReferrer();
	}
		
	this.CheckVisitParameters();
	this.CollectDefaultParameters();
}

Visilabs.prototype.CreateReferrer = function(){

	var	RS	= null;
	var	QS	= null;
	
	RS	= this.ReferrerURI.protocol +"://"+ this.ReferrerURI.authority + this.ReferrerURI.path +"?";
	
	if(this.ReferrerURI.query && this.ReferrerURI.query != null){
	
		for(var Key in this.ReferrerURI.queryKey){
			
			for(var i=0; i<this.ReferrerParameters.length; i++){
			
				if(Key == this.ReferrerParameters[i]){
				
					if(QS == null){
					
						QS	= Key +"="+ PrepDecoded(this.ReferrerURI.queryKey[Key]);
					}
					else{
					
						QS	+= "&"+ Key +"="+ PrepDecoded(this.ReferrerURI.queryKey[Key]);
					}
				}
			}
		}
		
		if(QS != null){
		
			RS += QS;
		}
	}
	
	this.NReferrer	= RS;
};

Visilabs.prototype.CollectSearchEngines = function(){

	var	ParamArr	= null;
	var	Value		= null;
	var	Resume		= false;
	var	ParamName	= null;
		
	for(var i=0; i<this.SearchEngines.length; i++){
	
		if(this.ReferrerURI.authority.indexOf(this.SearchEngines[i].Authority) != -1){
								
			Resume		= true;
			ParamName	= this.SearchEngines[i].QueryParamName;
			
			break;
		}
	}
			
	if(Resume && this.ReferrerURI.query && this.ReferrerURI.query != null){
	
		for(var Key in this.ReferrerURI.queryKey){
										
			if(Key == ParamName){
			
				Value	= this.ReferrerURI.queryKey[Key];
				break;
			}
		}
	}

	if(Value != null){
	
		this.AddParameter("OM.q", Value);
	}
};

Visilabs.prototype.CheckVisitParameters = function(){

	if(!_VLVisitChecked){
	
		var	PVCountInVisit		= this.GetCookie("VL_PVCountInVisit");
		var	TotalVisitCount		= this.GetCookie("VL_TotalVisit");
		var	TotalPVCount		= this.GetCookie("VL_TotalPV");
		var	LastVisitTime		= this.GetCookie("VL_LastVisitTime");
		var	FirstVisitTime		= this.GetCookie("VL_FirstVisitTime");
		var	VisitStartTime		= this.GetCookie("VL_VisitStartTime");
		var	LastPageViewTime	= this.GetCookie("VL_LastPageViewTime");
		var	TotalDuration		= this.GetCookie("VL_TotalDuration");
		var	LastPVTimeTD		= this.GetCookie("VL_LastPVTimeForTD");
		var	DTLastPVTime		= null;
		var	Now					= new Date();
		
		if(LastPVTimeTD != null){
		
			DTLastPVTime	= this.GenericStringToDate(LastPVTimeTD);
		}
		else{
		
			DTLastPVTime	= Now;
		}
		
		this.SetCookie("VL_LastPageViewTime", this.ToLongDateString(new Date(), DateFormat.YYYYMMDD, "-"), 1000, "D");
		this.SetCookie("VL_LastPVTimeForTD", this.ToLongDateString(new Date(), DateFormat.YYYYMMDD, "-"), 30, "M");
		
		if(TotalDuration == null){
		
			this.SetCookie("VL_TotalDuration", Math.round(((Now - DTLastPVTime) / 1000)), 1000, "D");
		}
		else{
		
			TotalDuration	= Math.round(Number(TotalDuration) + ((Now - DTLastPVTime) / 1000));
			this.SetCookie("VL_TotalDuration", TotalDuration, 1000, "D");
		}
		
		if(FirstVisitTime == null){
		
			this.SetCookie("VL_FirstVisitTime", this.ToLongDateString(new Date(), DateFormat.YYYYMMDD, "-"), 1000, "D");
		}
		
		if(TotalPVCount != null){
		
			TotalPVCount	= Number(TotalPVCount) + 1;
			this.SetCookie("VL_TotalPV", TotalPVCount, 1000, "D");
		}
		else{
		
			this.SetCookie("VL_TotalPV", "1", 1000, "D");
		}
		
		if(PVCountInVisit != null){
		
			PVCountInVisit	= Number(PVCountInVisit) + 1;
			this.SetCookie("VL_PVCountInVisit", PVCountInVisit.toString(), 30, "M");
		}
		else{
		
			this.SetCookie("VL_PVCountInVisit", "1", 30, "M");
			this.SetCookie("VL_VisitStartTime", this.ToLongDateString(new Date(), DateFormat.YYYYMMDD, "-"), 30, "M");
			
			if(TotalVisitCount == null){
			
				this.SetCookie("VL_TotalVisit", "1", 1000, "D");
			}
			else{
			
				TotalVisitCount	= Number(TotalVisitCount) + 1;
				
				this.SetCookie("VL_TotalVisit", TotalVisitCount.toString(), 1000, "D");
				this.SetCookie("VL_LastVisitTime", this.ToLongDateString(new Date(), DateFormat.YYYYMMDD, "-"), 1000, "D");
			}
		}
		
		_VLVisitChecked	= true;
	}
	
	var	VisitPV		= this.GetCookie("VL_PVCountInVisit");
	var	VisitCount	= this.GetCookie("VL_TotalVisit");
	var	TotalPV		= this.GetCookie("VL_TotalPV");
	var	LastVisit	= this.GetCookie("VL_LastVisitTime");
	var	TDuration	= this.GetCookie("VL_TotalDuration");
	
	if(VisitPV != null){
	
		this.AddParameter("OM.pviv", VisitPV);
	}
	
	if(VisitCount != null){
	
		this.AddParameter("OM.tvc", VisitCount);
	}
	
	if(TotalPV != null){
	
		this.AddParameter("OM.th", TotalPV);
	}

	if(LastVisit != null){
	
		this.AddParameter("OM.lvt", LastVisit);
	}
	
	if(TDuration != null && Number(TDuration) > 0){
	
		this.AddParameter("OM.tvd", TDuration);
	}
};

Visilabs.prototype.CollectDefaultParameters = function(){

	var	TmpValue;

	this.CollectCookieID();
	this.CheckNewVisitor();
	
	this.AddParameter("OM.resol", screen.width +"x"+ screen.height);
	this.AddParameter("OM.jv", ((navigator.javaEnabled()) ? "Yes" : "No"));
	this.AddParameter("OM.nrv", ((this.IsNew) ? "1" : "0"));
	this.AddParameter("OM.domain", this.URI.authority);
	this.AddParameter("OM.uri", this.URI.path);
	
	if(document.referrer){
	
		this.AddParameter("OM.rDomain", this.NReferrer);
		
		if(this.URI.authority != this.ReferrerURI.authority){
		
			this.SetCookie("VL_FirstReferrer", this.NReferrer, 30, "D");
		}
	}
		
	TmpValue	= this.GetCookie("VL_FirstReferrer");
	
	if(TmpValue != null){
	
		this.AddParameter("OM.vrdomain", TmpValue);
	}
	
	TmpValue = getFlashVersion();
	
	if(TmpValue != null && TmpValue != ""){
	
		this.AddParameter("OM.fv", TmpValue);
	}
	
	TmpValue = this.GetCookie("_ExVID");
	
	if(TmpValue != null && TmpValue != ""){
	
		this.AddParameter("OM.exVisitorID", TmpValue);
	}
	
	if(this.URI != null){
	
		for(var Key in this.URI.queryKey){
		
			this.AddParameter(Key, this.URI.queryKey[Key]);
		}
	}	
};

Visilabs.prototype.CollectCookieID = function(){

	var	_TmpVal	= this.GetCookie("OfferMiner_ID");
	
	if(_TmpVal != null){
	
		this.CookieID	= _TmpVal;
	}
	else{
	
		this.CreateCookieID();
		this.CookieID = this.GetCookie("OfferMiner_ID");
	}
};

Visilabs.prototype.CreateCookieID = function(){

    var a = new Date();
    var b = a.getUTCFullYear();
    var c = a.getMonth() + 1;
    var d = a.getDate();
    var e = a.getHours();
    var f = a.getMinutes();
    var g = a.getSeconds();
    var s = "";
    
    if (parseInt(c) < 10) { c = "0" + c }
    if (parseInt(d) < 10) { d = "0" + d }
    if (parseInt(e) < 10) { e = "0" + e }
    if (parseInt(f) < 10) { f = "0" + f }
    if (parseInt(g) < 10) { g = "0" + g }
    
    for(i=0; i<16; i++)
    {
        s += String.fromCharCode(65 + Math.round(Math.random() * 25))
    }
    
    s += "" + b + c + d + e + f + g;
    
	this.SetCookie("OfferMiner_ID", s, 1000, "D");
	return s;
};

Visilabs.prototype.AddParameter = function(Name, Value){

	this.Parameters[Name]	= PrepEncoded(Value);
};

Visilabs.prototype.ParameterExists = function(Name){

	if(this.Parameters[Name] && this.Parameters[Name] != null && this.Parameters[Name] != ""){
	
		return true;
	}
	
	return false;
};

Visilabs.prototype.SetCookie = function(Name, Value, Timeout, TimeoutType){

	var	cDate		= new Date();
	var	cValue		= cDate.getTime();
	var	_Domain		= this.URI.authority.split(":")[0];

	if(this.ParameterExists("OM.domain")){
	
		_Domain	= PrepDecoded(this.Parameters["OM.domain"]).split(":")[0];
	}
	
	if(Timeout < 0){
	
		cDate.setTime(cDate.getTime() - (1 * 60 * 1000));
	}
	else{
	
		if(TimeoutType == "D" || TimeoutType == "DAY"){
			
			cDate.setTime(cDate.getTime() + (Timeout * 24 * 60 * 60 * 1000));
		}
		else{
		
			cDate.setTime(cDate.getTime() + (Timeout * 60 * 1000));
		}			
	}

	document.cookie	= Name + "=" + Value + "; expires=" + cDate.toGMTString() + "; path=/; domain=" + ((_Domain == "localhost") ? ";" : _Domain);
};

Visilabs.prototype.GetCookie = function(Name){

    var	CookieArr	= document.cookie.split(";");
    var	Val			= null;
    
    for(var i=0; i<CookieArr.length; i++){
            
        while(CookieArr[i].charAt(0) == " "){
        
			CookieArr[i]	= CookieArr[i].substring(1, CookieArr[i].length);
		}

        if (CookieArr[i].indexOf(Name + "=") >= 0){
        
            Val	= CookieArr[i].substring((Name + "=").length, CookieArr[i].length);    
		}
    }
    
    return Val;
};

Visilabs.prototype.CleanUp = function(){

	this.Parameters	= new Object();
};

Visilabs.prototype.Recollect = function(Params){

	for(var i=0; i<Params.length; i++){
	
		this.AddParameter(Params[i][0], Params[i][1]);
	}

	this.WriteCookieParameters();
	this.SendSegmentRequest();
};

Visilabs.prototype.OnExVisitorIDChanged = function(){

	if(this.ParameterExists("OM.exVisitorID")){
	
		var	TmpValue	= this.GetCookie("_ExVID");
				
		if(this.Parameters["OM.exVisitorID"].toString() != TmpValue){
		
			this.ClearCookieParams();
		}
	}
};

Visilabs.prototype.ClearCookieParams = function(){

	for(var i=0; i<this.CookieParams.length; i++){
		
		try
		{			
			if(this.Parameters[this.CookieParams[i].Name]){
			
				delete this.Parameters[this.CookieParams[i].Name];
			}
						
			if(this.Parameters[this.CookieParams[i].ParameterName]){
			
				delete this.Parameters[this.CookieParams[i].ParameterName];
			}
					
			this.SetCookie(this.CookieParams[i].CName, "", -1, "D");
		}
		catch(Ex){};
	}
};

Visilabs.prototype.Collect = function(){
		
	if(_SendPageLoadTime){
	
		if(_PageLoadFinish != null){
					
			this.AddParameter("OM.pld", (_PageLoadFinish - _PageLoadStart) / 1000);
			this.CollectB();
		}
		else{
				
			var	_this	= this;
			setTimeout(function(){_this.Collect();}, 500);
		}
	}
	else{
	
		this.CollectB();
	}
};

Visilabs.prototype.CollectB = function(){

	if(this.GetCookie("_ExVID") == null){
	
		this.WriteExVisitorID();
	}
	
	this.OnExVisitorIDChanged();
	this.WriteCookieParameters();	
	this.SendSegmentRequest();
};

Visilabs.prototype.WriteExVisitorID = function(){

	if(this.ParameterExists("OM.exVisitorID")){
	
		this.SetCookie("_ExVID", this.Parameters["OM.exVisitorID"], 1000, "DAY");
	}
}

Visilabs.prototype.SendSegmentRequest = function(){

	var	Dt		= new Date();
	var	Img		= new Image();
	var	ImgRt	= new Image();
	var	Src		= null;
	var	_this	= this;
	
	Src	 = this.URI.protocol + "://" + "[DOMAIN]" + this.DataSource + "/om.gif?OM.siteID=" + this.SiteID + ((this.CookieID != null) ? ("&OM.cookieID=" + this.CookieID) : "") +"&OM.oid="+ this.OrganizationID;

	this.WriteExVisitorID();
	
	for(var Key in this.Parameters){
	
		Src	+= "&"+ Key +"="+ this.Parameters[Key];
	}
	
	Img.src		= Src.split("[DOMAIN]").join(this.SegmentURL) +"&dat="+ Dt.toUTCString();
	ImgRt.src	= Src.split("[DOMAIN]").join(this.RealtimeURL) +"&dat="+ Dt.toUTCString();
};

Visilabs.prototype.ClearURL = function(url){

	return url.split("@").join("%40");
};

Visilabs.prototype.WriteCookieParameters = function(){

	var	CValue;
	var	TmpArr;
	var	LastValue;
	var	CurrentValue;
	var	WriteAvailable;

	for(var i=0; i<this.CookieParams.length; i++){
		
		if(this.Parameters[this.CookieParams[i].Name] && this.Parameters[this.CookieParams[i].Name] != ""){
				
			CValue			= this.GetCookie(this.CookieParams[i].CName);
			TmpArr			= new Array();
			LastValue		= null;
			WriteAvailable	= true;
			
			if(CValue != null && CValue != ""){
			
				TmpArr		= CValue.split("~");
				LastValue	= PrepDecoded((this.CookieParams[i].CollectDate) ? TmpArr[0].split("|")[0] : TmpArr[0]);
								
				if(LastValue != null){
				
					if(this.CookieParams[i].CollectDate){
					
						LastValue	= PrepDecoded(LastValue.split("|")[0]);
					}
					else{
					
						LastValue	= PrepDecoded(LastValue);
					}
				}
				
				if(this.CookieParams[i].WriteDistinct == true){
													
					for(var t=0; t<TmpArr.length; t++){
										
						if(TmpArr[t] == this.Parameters[this.CookieParams[i].Name]){
						
							WriteAvailable	= false;
							break;
						}
					}
				}
									
				if(LastValue != PrepDecoded(this.Parameters[this.CookieParams[i].Name]) && WriteAvailable){
				
					if(TmpArr.length > this.CookieParams[i].Count-1){
					
						TmpArr.splice(this.CookieParams[i].Count-1, 1);
					}
				}								
			}
						
			if(LastValue != PrepDecoded(this.Parameters[this.CookieParams[i].Name]) && WriteAvailable){
				
				CurrentValue	= this.Parameters[this.CookieParams[i].Name];
				
				if(this.CookieParams[i].RelatedParameters && this.CookieParams[i].RelatedParameters != null){
				
					for(var j=0; j<this.CookieParams[i].RelatedParameters.length; j++){
					
						if(this.Parameters[this.CookieParams[i].RelatedParameters[j]] && this.Parameters[this.CookieParams[i].RelatedParameters[j]] != ""){
						
							CurrentValue	+= "|"+ this.Parameters[this.CookieParams[i].RelatedParameters[j]];
						}
					}
				}
				
				if(this.CookieParams[i].CollectDate){
				
					CurrentValue	+= "|"+ this.ToLongDateString(new Date(), DateFormat.YYYYMMDD, "-");
				}
				
				TmpArr.splice(0, 0, CurrentValue);
				TmpArr	= TmpArr.join("~");
				
				this.SetCookie(this.CookieParams[i].CName, PrepEncoded(TmpArr), this.CookieParams[i].Minutes, "M");
				
				if(this.CookieParams[i].ParameterName != null && this.CookieParams[i].ParameterName != ""){
				
					this.AddParameter(this.CookieParams[i].ParameterName, TmpArr);
				}	
			}
		}
	}
		
	for(var i=0; i<this.CookieParams.length; i++){
	
		CValue	= this.GetCookie(this.CookieParams[i].CName);
		
		if(CValue != null){
		
			if(this.CookieParams[i].ParameterName != null && this.CookieParams[i].ParameterName != ""){
			
				this.AddParameter(this.CookieParams[i].ParameterName, CValue);
			}
		}
	}
};

Visilabs.prototype.CheckNewVisitor = function(){

    var	CookieArr	= document.cookie.split(";");
    var	OMB_INW		= this.GetCookie("OM_INW");
    var	OMB_New		= this.GetCookie("OMB_New");
                  	
    if(OMB_INW == null){
    
		this.IsNew	= true;
    
		this.SetCookie("OM_INW", "1", this.NewCookieTimeout, "DAY");
		this.SetCookie("OMB_New", "1", this.VisitTimeout, "MIN");
    }
    else{
    
		if(OMB_New != null){
		
			this.IsNew	= true;
			this.SetCookie("OMB_New", "1", this.VisitTimeout, "MIN");
		}
    }
};

Visilabs.prototype.GenericStringToDate = function(_Date){

	var	Arr		= _Date.split(" ");
	var	DArr	= Arr[0].split("-");
	var	TArr	= Arr[1].split(":");
	
	return new Date(Number(DArr[0]), Number(DArr[1])-1, Number(DArr[2]), Number(TArr[0]), Number(TArr[1]), Number(TArr[2]));
};

Visilabs.prototype.ToLongDateString = function(_Date, _Format, _Seperator){

	var	_Month;
	var	_Day;
	var	_Hour;
	var	_Minute;
	var	_Second;
	var	Seperator;

	if(_Seperator && _Seperator != null){
	
		Seperator	= _Seperator;
	}
	else{
	
		Seperator	= ".";
	}

	if(_Date.getMonth() + 1 < 10){
	
		_Month	= "0"+ (_Date.getMonth() + 1);
	}
	else{
	
		_Month	= (_Date.getMonth() + 1);
	}

	if(_Date.getDate() < 10){
	
		_Day	= "0"+ _Date.getDate();
	}
	else{
	
		_Day	= _Date.getDate();
	}

	if(_Date.getHours() < 10){
	
		_Hour	= "0"+ _Date.getHours();
	}
	else{
	
		_Hour	= _Date.getHours();
	}

	if(_Date.getMinutes() < 10){
	
		_Minute	= "0"+ _Date.getMinutes();
	}
	else{
	
		_Minute	= _Date.getMinutes();
	}

	if(_Date.getSeconds() < 10){
	
		_Second	= "0"+ _Date.getSeconds();
	}
	else{
	
		_Second	= _Date.getSeconds();
	}

	switch(_Format)
	{
		case DateFormat.DDMMYYYY:
			{
				return _Day + Seperator + _Month + Seperator + _Date.getFullYear() +" "+ _Hour +":"+ _Minute +":"+ _Second;
			}
		case DateFormat.MMDDYYYY:
			{
				return _Month + Seperator + _Day + Seperator + _Date.getFullYear() +" "+ _Hour +":"+ _Minute +":"+ _Second;
			}
		case DateFormat.YYYYMMDD:
			{
				return _Date.getFullYear() + Seperator + _Month + Seperator + _Day +" "+ _Hour +":"+ _Minute +":"+ _Second;
			}
	}

	return null;
};

Visilabs.prototype.Suggest = function(ZoneID, ContentID, ProductCode, Callback, OnErrorCallback){

	var	Owner	= this;
	var	VTarget	= new VisilabsTarget(ContentID, Owner, Callback, OnErrorCallback);
	
		if(ZoneID != null && ZoneID != ""){
		
			VTarget.AddParameter("OM.zid", ZoneID);
		}
		
		if(ProductCode != null && ProductCode != ""){
		
			VTarget.AddParameter("OM.body", ProductCode);
		}
						
		VTarget.Collect();
};

Visilabs.prototype.SuggestActions = function(Callback, OnErrorCallback){

	var	Owner	= this;
	var	VTarget	= new VisilabsTarget(null, Owner, Callback, OnErrorCallback);
						
		VTarget.CollectActions();
};

Visilabs.prototype.CollectClicks = function(){

	var	_this			= this;
	var	Anchors			= document.getElementsByTagName("a");
	var	Anchor			= null;
	var	AnchorURI		= null;
	var	FileExtension	= null;
	var	FileName		= null;
	var	FileNameArray	= null;
	
	for(var Key in Anchors){
		
		Anchor	= Anchors[Key];
		
		if(Anchor.className && Anchor.className.indexOf("visianchor") != -1 && Anchor.href && Anchor.href != "" && Anchor.href != "#"){
		
			Anchor.setAttribute("visihref", Anchor.href);
			
			Anchor.href			= "#";			
			Anchor.style.cursor	= "pointer";
			
			if(window.attachEvent){
			
				Anchor.attachEvent("onclick", function(e){_this.FollowAnchorClick(e);});
			}
			else{
			
				Anchor.addEventListener("click", function(e){_this.FollowAnchorClick(e);}, false);
			}

			AnchorURI	= parseUri(Anchor.attributes["visihref"].value);
								
			if(AnchorURI["file"]){
			
				FileName		= AnchorURI["file"].split("?")[0];
				FileNameArray	= FileName.split(".");
				FileExtension	= FileNameArray[FileNameArray.length-1].toLowerCase();
			}
			else{
			
				FileExtension	= null;
			}
			
			if(FileExtension != null){
			
				for(var i=0; i<this.DownloadExtensions.length; i++){
				
					if(FileExtension == this.DownloadExtensions[i]){
					
						if(Anchor.attributes["vlkeys"]){
						
							if(Anchor.attributes["vlkeys"].value != ""){
							
								Anchor.setAttribute("vlkeys", Anchor.attributes["vlkeys"].value +";OM.df");
								Anchor.setAttribute("vlvalues", Anchor.attributes["vlvalues"].value +";"+ FileName);
							}
							else{
							
								Anchor.setAttribute("vlkeys", "OM.df");
								Anchor.setAttribute("vlvalues", FileName);
							}
						}
						else{
						
							Anchor.setAttribute("vlkeys", "OM.df");
							Anchor.setAttribute("vlvalues", FileName);
						}
					
						break;
					}
				}
			}
		}
	}
};

Visilabs.prototype.CollectDownloadLinks = function(){

	var	_this			= this;
	var	Anchors			= document.getElementsByTagName("a");
	var	Anchor			= null;
	var	AnchorURI		= null;
	var	FileExtension	= null;
	var	FileName		= null;
	var	FileNameArray	= null;
	var	Resume			= false;
	
	for(var Key in Anchors){
		
		Anchor	= Anchors[Key];
		Resume	= false;
		
		if(Anchor.href && Anchor.href != "" && Anchor.href != "javascript:void(0)"){
		
			AnchorURI	= parseUri(Anchor.href);
								
			if(AnchorURI["file"]){
			
				FileName		= AnchorURI["file"].split("?")[0];
				FileNameArray	= FileName.split(".");
				FileExtension	= FileNameArray[FileNameArray.length-1].toLowerCase();
				
				for(var i=0; i<this.DownloadExtensions.length; i++){
				
					if(FileExtension == this.DownloadExtensions[i]){
					
						Resume	= true;
						break;
					}	
				}
			}
			else{
			
				FileExtension	= null;
			}
			
			if(FileExtension != null && Resume){
								
				if((typeof(Anchor.target) == typeof(undefined)) || (Anchor.target.toString() != "_blank")){
				
					Anchor.setAttribute("visihref", Anchor.href);
					
					Anchor.href			= "javascript:void(0)";
					Anchor.style.cursor	= "pointer";
				}
				
				if(window.attachEvent){
				
					Anchor.attachEvent("onclick", function(e){_this.FollowAnchorClick(e);return false;});
				}
				else{
				
					Anchor.addEventListener("click", function(e){_this.FollowAnchorClick(e);return false;}, false);
				}
			
				for(var i=0; i<this.DownloadExtensions.length; i++){
				
					if(FileExtension == this.DownloadExtensions[i]){
					
						if(Anchor.attributes["vlkeys"]){
						
							if(Anchor.attributes["vlkeys"].value != ""){
							
								Anchor.setAttribute("vlkeys", Anchor.attributes["vlkeys"].value +";OM.df");
								Anchor.setAttribute("vlvalues", Anchor.attributes["vlvalues"].value +";"+ FileName);
							}
							else{
							
								Anchor.setAttribute("vlkeys", "OM.df");
								Anchor.setAttribute("vlvalues", FileName);
							}
						}
						else{
						
							Anchor.setAttribute("vlkeys", "OM.df");
							Anchor.setAttribute("vlvalues", FileName);
						}
					
						break;
					}
				}
			}
		}
	}
};

Visilabs.prototype.FollowAnchorClick = function(e){

	var	hWnd	= (e && e.target) ? e.target : event.srcElement;	
	var	Keys	= (hWnd.attributes["vlkeys"] && hWnd.attributes["vlkeys"].value != "") ? hWnd.attributes["vlkeys"].value.split(";") : null;
	var	Values	= (hWnd.attributes["vlvalues"] && hWnd.attributes["vlvalues"].value != "") ? hWnd.attributes["vlvalues"].value.split(";") : null;
	var	Anchor	= (hWnd.attributes["visihref"] && hWnd.attributes["visihref"].value != "") ? hWnd.attributes["visihref"].value : hWnd.href;
	var	Dt		= new Date();
	var	Img		= new Image();
	var	Src		= null;
	
	if(Keys != null && Values != null && Anchor != null){
	
		Src	 = this.URI.protocol + "://" + "[DOMAIN]" + this.DataSource + "/om.gif?OM.cookieID=" + this.CookieID + "&OM.siteID=" + this.SiteID +"&OM.oid="+ this.OrganizationID;
			
		for(var Key in this.Parameters){
		
			if(Key == "OM.exVisitorID"){
			
				Src	+= "&"+ Key +"="+ this.Parameters[Key];
			}
		}
		
		for(var i=0; i<Keys.length; i++){
		
			if(i < Values.length){
			
				Src	+= "&"+ Keys[i] +"="+ PrepEncoded(Values[i]);
			}
		}
		
		Img.src		= Src.split("[DOMAIN]").join(this.SegmentURL) +"&dat="+ Dt.toUTCString();
		
		if(typeof(hWnd.target) == typeof(undefined) || (hWnd.target != "_blank")){
		
			Img.onload	= function(){document.location.href = Anchor};
			Img.onerror	= function(){document.location.href = Anchor};
		}
	}
};


var	_VTObjs		= new Object();
var	_VTObjIDs	= 0;

VisilabsTarget.prototype.ID							= null;
VisilabsTarget.prototype.Owner						= null;
VisilabsTarget.prototype.ContentID					= null;
VisilabsTarget.prototype.Parameters					= new Object();
VisilabsTarget.prototype.OnCallback					= null;
VisilabsTarget.prototype.TVisitCookieName			= "VLTVisitC";
VisilabsTarget.prototype.TVisitorCookieName			= "VLTVisitorC";
VisilabsTarget.prototype.BannerVisitCookieName		= "VLTB_VisitC";
VisilabsTarget.prototype.BannerVisitorCookieName	= "VLTB_VisitorC";
VisilabsTarget.prototype.OnErrorCallback			= null;
VisilabsTarget.prototype.RequestTimeout				= 2000;
VisilabsTarget.prototype.Completed					= false;

function VisilabsTarget(ContentID, Owner, OnCallback, OnErrorCallback){

	this.ID					= "_VisilabsTarget_"+ _VTObjIDs.toString();
	this.Owner				= Owner;
	this.ContentID			= ContentID;
	this.OnCallback			= OnCallback;
	this.OnErrorCallback	= OnErrorCallback;
	this.Parameters			= new Object();
	this.Completed			= false;
	this.RequestStartTime	= null;

	_VTObjs[this.ID]		= this;
	_VTObjIDs++;
}

VisilabsTarget.prototype.Collect = function(){

	this.CollectBoth("Target.js");
};

VisilabsTarget.prototype.CollectActions = function(){
	
	this.CollectBoth("act.js");
};

VisilabsTarget.prototype.CollectBoth = function(JSName){

	this.Completed		= false;
	
	var	_this			= this;
	var	JS				= null;
	var	Dt				= new Date();
	var	Src				= this.Owner.URI.protocol +"://"+ this.Owner.TargetURL + JSName +"?OM.cookieID=" + this.Owner.CookieID + "&OM.oid=" + this.Owner.OrganizationID + "&OM.siteID=" + this.Owner.SiteID + "&OM.obj=" + encodeURIComponent("_VTObjs[\"" + this.ID + "\"]") +"&dat="+ Dt.toUTCString();
	var	TVisitCookie	= this.Owner.GetCookie(this.TVisitCookieName);
	var	TVisitorCookie	= this.Owner.GetCookie(this.TVisitorCookieName);
	var	BVisitCookie	= this.Owner.GetCookie(this.BannerVisitCookieName);
	var	BVisitorCookie	= this.Owner.GetCookie(this.BannerVisitorCookieName);

	this.Owner.WriteExVisitorID();
	
	for(var Key in this.Parameters){
	
		Src	+= "&"+ Key +"="+ this.Parameters[Key];
	}

	this.Owner.OnExVisitorIDChanged();
	this.Owner.WriteCookieParameters();

	for(var Key in this.Owner.Parameters){
				
		if(this.Parameters[Key] == typeof(undefined) || this.Parameters[Key] == null || this.Parameters[Key] == ""){
		
			Src	+= "&"+ Key +"="+ this.Owner.Parameters[Key];
		}
	}

	if(TVisitCookie != null && TVisitCookie != ""){
	
		Src	+= "&OM.vcap="+ PrepEncoded(TVisitCookie);
	}

	if(TVisitorCookie != null && TVisitorCookie != ""){
	
		Src	+= "&OM.viscap="+ PrepEncoded(TVisitorCookie);
	}

	if(BVisitCookie != null && BVisitCookie != ""){
	
		Src	+= "&OM.bvcap="+ PrepEncoded(BVisitCookie);
	}

	if(BVisitorCookie != null && BVisitorCookie != ""){
	
		Src	+= "&OM.bviscap="+ PrepEncoded(BVisitorCookie);
	}

	JS			= document.createElement("script");
	JS.type		= "text/javascript";
	JS.async	= true;
	JS.src		= Src;
	JS.onerror	= function(){_this.OnError();};
	
	document.getElementsByTagName("head")[0].appendChild(JS);
	
	if(this.OnErrorCallback && this.OnErrorCallback != null){
	
		setTimeout(function(){_this.CheckRequestTimeout();}, _this.RequestTimeout);
	}
};

VisilabsTarget.prototype.CheckRequestTimeout = function(){

	if(!this.Completed){
		
		if(this.OnErrorCallback && this.OnErrorCallback != null){
		
			this.Completed	= true;
			this.OnErrorCallback(2);
		}
	}
};

VisilabsTarget.prototype.OnError = function(){

	if(!this.Completed){
	
		if(this.OnErrorCallback && this.OnErrorCallback != null){
		
			this.Completed	= true;
			this.OnErrorCallback(1);
		}
	}
};

VisilabsTarget.prototype.AddParameter = function(Name, Value){

	this.Parameters[Name]	= PrepEncoded(Value);
};

VisilabsTarget.prototype.Callback = function(Result, TVisitCookie, TVisitorCookie, BVisitCookie, BVisitorCookie){

	if(!this.Completed){

		this.Completed	= true;

		if(TVisitCookie && TVisitCookie != null && TVisitCookie != ""){
		
			this.Owner.SetCookie(this.TVisitCookieName, PrepEncoded(TVisitCookie), this.Owner.VisitTimeout, "M");
		}
		
		if(TVisitorCookie && TVisitorCookie != null && TVisitorCookie != ""){
		
			this.Owner.SetCookie(this.TVisitorCookieName, PrepEncoded(TVisitorCookie), this.Owner.NewCookieTimeout, "DAY");
		}

		if(BVisitCookie && BVisitCookie != null && BVisitCookie != ""){
		
			this.Owner.SetCookie(this.BannerVisitCookieName, PrepEncoded(BVisitCookie), this.Owner.VisitTimeout, "M");
		}

		if(BVisitorCookie && BVisitorCookie != null && BVisitorCookie != ""){
		
			this.Owner.SetCookie(this.BannerVisitorCookieName, PrepEncoded(BVisitorCookie), this.Owner.NewCookieTimeout, "DAY");
		}

		if((typeof(Result)).toString() == "string"){
		
			if(this.ContentID != null && this.ContentID != ""){
			
				if(Result == null ||Result == ""){
				
					document.getElementById(this.ContentID).style.display	= "none";
				}
				else{
				
					document.getElementById(this.ContentID).style.display	= "";
					document.getElementById(this.ContentID).innerHTML		= Result;
				}
			}
			
			if(this.OnCallback && this.OnCallback != null){
			
				this.OnCallback();
			}
		}
		else{
		
			if(this.OnCallback && this.OnCallback != null){
			
				this.OnCallback(Result);
			}
		}		
	}
};

function parseUri (str) {
	var	o   = parseUri.options,
		m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
		uri = {},
		i   = 14;

	while (i--) uri[o.key[i]] = m[i] || "";

	uri[o.q.name] = {};
	uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
		if ($1) uri[o.q.name][$1] = $2;
	});

	return uri;
};

parseUri.options = {
	strictMode: false,
	key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
	q:   {
		name:   "queryKey",
		parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	},
	parser: {
		strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
		loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	}
};

function PrepEncoded(S){

	var	_S	= S;
	
	try
	{
		_S	= decodeURIComponent(_S);
	}
	catch(Ex){}

	return encodeURIComponent(_S);
}

function PrepDecoded(S){

	var	_S	= S;
	
	try
	{
		_S	= decodeURIComponent(_S);
	}
	catch(Ex){}

	return _S;
}

function DetectFlash(){

	var hasFlash = false;
	try {
	  var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
	  if(fo) hasFlash = true;
	}catch(e){
	  if(navigator.mimeTypes ["application/x-shockwave-flash"] != undefined) hasFlash = true;
	}
	
	return hasFlash;
}

function getFlashVersion() {
	try {
		try {
			var axo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.6');
			try { axo.AllowScriptAccess = 'always'; }
			catch (e) { return '6.0.0'; }
		} catch (e) { }
		return new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version').replace(/\D+/g, '.').match(/^,?(.+),?$/)[1];
	} catch (e) {
		try {
			if (navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin) {
				return (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ".").match(/^,?(.+),?$/)[1];
			}
		} catch (e) { }
	}
	return null;
}

function DateFormat(){}

DateFormat.DDMMYYYY	= "DDMMYYYY";
DateFormat.MMDDYYYY	= "MMDDYYYY";
DateFormat.YYYYMMDD	= "YYYYMMDD";

function VL_CP(Name, CName, Count, ParameterName, Minutes, CollectDate, RelatedParameters, WriteDistinct){

	this.Name				= Name;
	this.Count				= Count;
	this.CName				= CName;
	this.ParameterName		= ParameterName;
	this.Minutes			= Minutes;
	this.CollectDate		= CollectDate;
	this.RelatedParameters	= RelatedParameters;
	this.WriteDistinct		= WriteDistinct;
}

function SEngine(Authority, QueryParamName){

	this.Authority		= Authority;
	this.QueryParamName	= QueryParamName;
}