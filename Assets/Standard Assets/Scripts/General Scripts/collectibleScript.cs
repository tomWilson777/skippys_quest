using UnityEngine;
using System.Collections;

public class collectibleScript : MonoBehaviour {
	private int collected = 0; //Set up a variable to store how many you've collected
	private int giantCollected = 0;
	public AudioClip collectedSound;     //This is the sound that will play after you collect one
	
	//This is the text that displayed how many you've collected in the top left corner
	void OnGUI(){
		GUI.Label(new Rect(10, 10, 200, 20), "Collected:" + collected);
		GUI.Label(new Rect(10, 30, 200, 20), "Giant Collected:" + giantCollected);
	}
	
	private void OnTriggerEnter(Collider other){ //Checks to see if you've collided with another object
		if(other.tag.Contains("collect")){ //checks to see if this object is tagged with "collectable"
			//audio.PlayOneShot(collectedSound); //plays the sound assigned to collectedSound
			collected++; //adds a count of +1 to the collected variable
			Destroy(other.gameObject); //destroy's the collectable
		}else if(other.tag.Contains("giant")){
			//audio.PlayOneShot(collectedSound);
			giantCollected++;
			Destroy (other.gameObject);
		}else if(other.tag.Contains ("enemy")){
			OnEnemyHit();
		}
		
	}

	private void OnEnemyHit(){
		Debug.Log ("OUCH");
	}
}