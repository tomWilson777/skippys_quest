// This makes the character turn to face the current movement speed per default.
var autoRotate : boolean = true;
var maxRotationSpeed : float = 360;

private var motor : CharacterMotor;

public var idleAnimation : AnimationClip;
public var walkAnimation : AnimationClip;
public var runAnimation : AnimationClip;
public var jumpPoseAnimation : AnimationClip;
public var attackAnimation : AnimationClip;

public var walkMaxAnimationSpeed : float = 0.75;
public var trotMaxAnimationSpeed : float = 1.0;
public var runMaxAnimationSpeed : float = 1.0;
public var jumpAnimationSpeed : float = 1.15;
public var landAnimationSpeed : float = 1.0;
public var attackAnimationSpeed : float = 1.0;

private var _animation : Animation;

enum CharacterState {
	Idle = 0,
	Walking = 1,
	Trotting = 2,
	Running = 3,
	Jumping = 4,
	Attacking = 5
}
private var _characterState : CharacterState;

//JUMPING stuff

// Use this for initialization
function Awake () {
	motor = GetComponent(CharacterMotor);
}

// Update is called once per frame
function Update () {
	// Get the input vector from keyboard or analog stick
	var directionVector = new Vector3(Input.GetAxis("Horizontal"), Input.GetAxis("Vertical"), 0);
	
	_animation = GetComponent(Animation);
	if(!_animation){
		//Debug.Log("The character you would like to control doesn't have animations. Moving her might look weird.");
	}
	

	
	if(!idleAnimation) {
		_animation = null;
		//Debug.Log("No idle animation found. Turning off animations.");
	}
	if(!walkAnimation) {
		_animation = null;
		//Debug.Log("No walk animation found. Turning off animations.");
	}
	if(!runAnimation) {
		_animation = null;
		//Debug.Log("No run animation found. Turning off animations.");
	}
	if(!jumpPoseAnimation) {
		_animation = null;
		//Debug.Log("No jump animation found and the character has canJump enabled. Turning off animations.");
	}
	if(!attackAnimation) {
		_animation = null;
		//Debug.Log("No attack animation found. Turning off animations.");
	}
	
	_characterState = CharacterState.Idle;
	
	if (directionVector != Vector3.zero) {
		// Get the length of the directon vector and then normalize it
		// Dividing by the length is cheaper than normalizing when we already have the length anyway
		var directionLength = directionVector.magnitude;
		directionVector = directionVector / directionLength;
		
		// Make sure the length is no bigger than 1
		directionLength = Mathf.Min(1, directionLength);
		
		// Make the input vector more sensitive towards the extremes and less sensitive in the middle
		// This makes it easier to control slow speeds when using analog sticks
		directionLength = directionLength * directionLength;
		
		// Multiply the normalized direction vector by the modified length
		directionVector = directionVector * directionLength;
		_characterState = CharacterState.Running;
	}
	
	// Rotate the input vector into camera space so up is camera's up and right is camera's right
	directionVector = Camera.main.transform.rotation * directionVector;
	
	// Rotate input vector to be perpendicular to character's up vector
	var camToCharacterSpace = Quaternion.FromToRotation(-Camera.main.transform.forward, transform.up);
	directionVector = (camToCharacterSpace * directionVector);
	
	// Apply the direction to the CharacterMotor
	motor.inputMoveDirection = directionVector;
	motor.inputJump = Input.GetButton("Jump");
	
	// Set rotation to the move direction	
	if (autoRotate && directionVector.sqrMagnitude > 0.01 && motor.timer <= 0) {
		var newForward : Vector3 = ConstantSlerp(
			transform.forward,
			directionVector,
			maxRotationSpeed * Time.deltaTime * 2
		);
		newForward = ProjectOntoPlane(newForward, transform.up);
		transform.rotation = Quaternion.LookRotation(newForward, transform.up);
		
	}
	
	// ANIMATION sector
	if(_animation) {
		if(_characterState == CharacterState.Jumping) 
		{
			
			_animation[jumpPoseAnimation.name].speed = -landAnimationSpeed;
			_animation[jumpPoseAnimation.name].wrapMode = WrapMode.ClampForever;
			_animation.CrossFade(jumpPoseAnimation.name);				
			
		} 
		else 
		{	
			if(motor.movement.velocity.magnitude < 0.1) {
				_animation.CrossFade(idleAnimation.name);
			}
			else 
			{
				if(_characterState == CharacterState.Running) {
					_animation[runAnimation.name].speed = Mathf.Clamp(motor.movement.velocity.magnitude, 0.0, runMaxAnimationSpeed);
					_animation.CrossFade(runAnimation.name);	
				}
				else if(_characterState == CharacterState.Trotting) {
					_animation[walkAnimation.name].speed = Mathf.Clamp(motor.movement.velocity.magnitude, 0.0, trotMaxAnimationSpeed);
					_animation.CrossFade(walkAnimation.name);	
				}
				else if(_characterState == CharacterState.Walking) {
					_animation[walkAnimation.name].speed = Mathf.Clamp(motor.movement.velocity.magnitude, 0.0, walkMaxAnimationSpeed);
					_animation.CrossFade(walkAnimation.name);	
				}
				
			}
		}
	}
	
	
	// ANIMATION sector
	
}

function ProjectOntoPlane (v : Vector3, normal : Vector3) {
	return v - Vector3.Project(v, normal);
}

function ConstantSlerp (from : Vector3, to : Vector3, angle : float) {
	var value : float = Mathf.Min(1, angle / Vector3.Angle(from, to));
	return Vector3.Slerp(from, to, value);
}





// Require a character controller to be attached to the same game object
@script RequireComponent (CharacterMotor)
@script AddComponentMenu ("Character/Platform Input Controller")
