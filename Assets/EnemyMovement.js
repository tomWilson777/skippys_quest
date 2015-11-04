#pragma strict

var myTransform : Transform;
var target : Vector3;
public var target1Pos : Vector3; //Target1 is changed in Unity editor.
public var target2Pos : Vector3; //Target2 is changed in Unity editor.
public var moveSpeed : float = 6.0f;
var onTarget1 = true;


function Start () {
	myTransform = transform;
	target = target1Pos;
}

function Update () {
	var lookDirection : Vector3;
	
	//rotation
	lookDirection = target - myTransform.position;

	var lookRot : Quaternion = Quaternion.LookRotation(lookDirection);
	lookRot.x = 0.0f;
	lookRot.z = 0.0f;
	
	if(onTarget1){ //IF to check whether enemy is headed to point1 or not.
		if(lookDirection.z > 1.0f){
			myTransform.rotation = lookRot;
			Debug.Log("LookRot: " + lookRot);
			myTransform.position += myTransform.forward * moveSpeed * Time.deltaTime;
		} else {
			onTarget1 = false;
			target = target2Pos;
		}
	} else {
		if(lookDirection.z < -1.0f){
			myTransform.rotation = lookRot;
			Debug.Log("LookRot2: "+lookRot);
			myTransform.position += myTransform.forward * moveSpeed * Time.deltaTime;
		} else {
			Debug.Log("switching to target1Pos");
			onTarget1 = true;
			target = target1Pos;
		}
	}
	Debug.Log("OnTarget1: "+onTarget1);
	
}