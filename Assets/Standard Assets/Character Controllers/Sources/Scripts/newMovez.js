var target:GameObject;
var maxDist = 20.0;
var minDist = 10.0;
var speed = 6.0;
var acc = 0.0;

function LateUpdate()
{
	var myDist = 0;
	
	if (acc==0)
	{
		myDist=maxDist;
	}
	else
	{
		myDist=minDist;
	}
	transform.LookAt(target.transform);
	
	var idist = Vector3.Distance(transform.position, target.transform.position);
	
	if(idist>myDist)
	{
		acc=Mathf.Min(acc+2,speed); 
	}
	else
	{
		acc=Mathf.Max(acc-2,0);
	}
	
	if(acc>0)
	{
		var iangle = transform.TransformDirection(Vector3(0,0,acc*Time.deltaTime));
		var controller: CharacterController = GetComponent(CharacterController);
		var flags = controller.Move(iangle);
	}
}