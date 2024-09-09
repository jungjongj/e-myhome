<?
if($stype=='') $stype='load';
$c_stype[$stype]='checked';
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta charset="utf-8">
<title>우편번호검색</title>
<style>
body, table, tr, td, form {
	margin:0 0 0 0;
	font-size: 12px;
	color: #3D3D3D;
}

.input,select {
	border: #94BACC 1px solid;
	FONT-SIZE: 9pt;
}

.button {
	background-color:#CDDEE7;
	border:1px #999999 solid;
}
</style>
<script src="http://post.rgboard.com/api/sido.php"></script>
<script>
function form_chk() {
	if(document.getElementById('sido').selectedIndex==0) {
		alert('시도를 선택해주세요.');
		return false;
	}
	if(document.getElementById('gungu').selectedIndex==0) {
		alert('시군구를 선택해주세요.');
		return false;
	}

	if(document.getElementById('kw').value.trim().length==0) {
		alert('검색어를 입력해주세요.');
		return false;
	}
}

function init() {
	chang_stype('<?=$stype?>');
	init_sido('<?=$sido?>');
	sido_chang('<?=$gungu?>');
}
</script>
</head>
<body bottommargin="0" topmargin="0" leftmargin="0" rightmargin="0" onLoad="init()">
<table width="450" align="center" border="0" cellpadding="0" cellspacing="0">
	<tr>
		<td height="10">
		</td>
	</tr>
	<tr>
		<td align="center">
		<form name="login_form" method="get" action="<?=$_SERVER['PHP_SELF']?>" onSubmit="return form_chk()" enctype='multipart/form-data'>
		<input type="hidden" name="form_info" value="<?=$form_info?>">
		<table width="100%" align="center" border="0" cellpadding="0" cellspacing="0">
			<tr>
				<td height="28" bgcolor="#F4FAFB" style="border-top:#54A8BA 3px solid;border-bottom:#54A8BA 1px solid;">&nbsp;&nbsp;우편번호검색</td>
			</tr>
		</table>
		<table width="100%" align="center" border="0" cellpadding="0" cellspacing="6" style="border-bottom:#54A8BA 1px solid;">
			<tr>
				<td align="center" style="border-bottom:#ECECEC 1px solid;padding-bottom:6px">
					<input type="radio" name="stype" value="load" onclick="chang_stype(this.value)" <?=$c_stype['load']?>>도로명+건물번호
					<input type="radio" name="stype" value="dong" onclick="chang_stype(this.value)" <?=$c_stype['dong']?>>동(읍/면/리)+지번
					<input type="radio" name="stype" value="building" onclick="chang_stype(this.value)" <?=$c_stype['building']?>>건물명(아파트명)
				</td>
			</tr>
			<tr>
			  <td align="center">
<div id='stype_ex_load' style="display:">
				 예 : 테헤란로 152 →  ‘서울시’‘강남구’ 선택 후 테헤란로 152
</div>
<div id='stype_ex_dong' style="display:none">
				  예 : 잠실동 27 → ‘서울시’’송파구’ 선택 후 잠실동 27
</div>
<div id='stype_ex_building' style="display:none">
				 예 :  ‘서울시’ ’강남구’ 선택 후 강남파이낸스센터 (건물명)
</div>
				 </td>
			  </tr>
				<tr>
					<td align="center" bgcolor="#EEEEEE" style="padding-top:6px;">
					시도 :
					<select name="sido" id="sido"  hname="시도" onChange="sido_chang()" style="width:120px">
						<option value="">선택</option>
					</select>
					시군구 :
					<select name="gungu" id="gungu"  hname="시군구" style="width:120px">
					<option value="">선택</option>
					</select>
					<table width="100%" align="center" border="0" cellpadding="0" cellspacing="6">
						<tr>
							<td width="90" align="right"><strong>검색어&nbsp;:</strong></td>
							<td align="center"><input type="text" class="input" name="kw" id="kw" style="width:100%"  value="<?=$kw?>"></td>
							<td width="90">
								<input type="submit" class="button" value=" 검색 "></td>
						</tr>
					</table>
					</td>
				</tr>
		</table>
<?
if($kw!='' && $sido!='') {
	list($form_name,$post1,$post2,$addr1,$addr2)=explode('|',$form_info);
?>
<script>
function submit_post(post,addr1,addr2) {
post=post.split('-');
addr1 = addr1.trim().replace(/  /gi, ' ');
addr1 = addr1.trim().replace(/  /gi, ' ');
addr2 = addr2.trim().replace(/  /gi, ' ');
addr2 = addr2.trim().replace(/  /gi, ' ');
<? if($form_name!='') { ?>
		window.opener.document.<?=$form_name?>.<?=$post1?>.value = post[0];
		window.opener.document.<?=$form_name?>.<?=$post2?>.value = post[1];
		window.opener.document.<?=$form_name?>.<?=$addr1?>.value = addr1;
	<? if($addr2!='') { ?>
		window.opener.document.<?=$form_name?>.<?=$addr2?>.value = addr2;
		window.opener.document.<?=$form_name?>.<?=$addr2?>.focus();
	<? } ?>   
<? } else { ?>
		window.opener.document.getElementById('<?=$post1?>').value = post[0];
		window.opener.document.getElementById('<?=$post2?>').value = post[1];
		window.opener.document.getElementById('<?=$addr1?>').value = addr1;
	<? if($addr2!='') { ?>
		window.opener.document.getElementById('<?=$addr2?>').value = addr2;
		window.opener.document.getElementById('<?=$addr2?>').focus();
	<? } ?>    			    
<? } ?>
self.close()
}
</script>
		<table width="98%" align="center" border="0" cellpadding="0" cellspacing="0">
<?
	$url="http://post.rgboard.com/api/post.php?";
	foreach($_REQUEST as $k => $v) {
		$url.="&".urlencode($k)."=".urlencode($v);
	}

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0)");
	$content = curl_exec($ch);
	curl_close($ch);

	$data=json_decode($content);
	
	if($data->cnt < 1) {
		echo "
	<tr height=\"100\">
		<td align=\"center\"><B>등록(검색) 된 자료가 없습니다.</td>
	</tr>";
	} else {
		foreach($data->list as $R) {
?>
			<tr onClick="submit_post('<?=$R->post?>','<?=$R->sido?> <?=$R->gungu?> <?=$R->myeon?> <?=$R->road?> <?=$R->road_no?>','<?=$R->building?>');" style="cursor:pointer">
				<td width="50" height="24" style="padding-left:5px;border-bottom:#ECECEC 1px solid;"><?=$R->post?></td>
				<td height="24" style="padding:4px 1px 1px 0px;border-bottom:#ECECEC 1px solid;"><?=$R->sido?> <?=$R->gungu?> <?=$R->myeon?> <?=$R->road?> <?=$R->road_no?> <?=$R->building?><br>
				<font color="#999999"><?=$R->sido?> <?=$R->gungu?> <?=$R->myeon?> <?=$R->dong?> <?=$R->dong_no?></font>
				</a></td>
			</tr>
<?
		}
?>
		</table>	
<?
	} 
}
?>		
<br>
		<table width="100%" align="center" border="0" cellpadding="0" cellspacing="0">
			<tr>
				<td align="center">
				<input type="button" class="button" value="  닫  기  " onClick="self.close()">
					</td>
			</tr>
		</table>
		</form>
		</td>
	</tr>
</table>
</body>
</html>