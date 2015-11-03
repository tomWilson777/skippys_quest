using UnityEngine;
using System.Collections;

public class PushButton : MonoBehaviour {
	GameObject sensedObject;
	private void OnTriggerEnter(Collider other){
		if(other.tag.Contains("button")){
			Debug.Log ("PUSHD DA BUTTTTT");
			other.transform.Translate(0.0f, -0.5f,0.0f);
			sensedObject = GameObject.FindGameObjectWithTag("giant_hidden");


			sensedObject.renderer.enabled = true;
			sensedObject.collider.enabled = true;
		}
	}
}
