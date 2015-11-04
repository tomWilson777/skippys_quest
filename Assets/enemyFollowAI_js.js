//ENEMY FOLLOW AI SCRIPT


var target : Transform; //the enemy's target
var moveSpeed = 3; //move speed
var rotationSpeed = 3; //speed of turning

var myTransform : Transform; //current transform data of this enemy

function Awake()
{
    myTransform = transform; //cache transform data for easy access/preformance
}

function Start()
{
     target = GameObject.FindWithTag("Player").transform; //target the player

}

function Update () {
	if (target.position.magnitude - myTransform.position.magnitude < 10){
    	//rotate to look at the player
    	myTransform.rotation = Quaternion.Slerp(myTransform.rotation,
    	Quaternion.LookRotation(target.position - myTransform.position), rotationSpeed*Time.deltaTime);
		myTransform.rotation.x = 0.0f;
		myTransform.rotation.z = 0.0f; //These prevent it from flipping on its back if you jump over it.
    	 //move towards the player
   		myTransform.position += myTransform.forward * moveSpeed * Time.deltaTime;
    }

}

