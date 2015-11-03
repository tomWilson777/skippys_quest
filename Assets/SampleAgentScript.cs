using UnityEngine;
using System.Collections;

public class SampleAgentScript : MonoBehaviour {

	public GameObject target;
	NavMeshAgent agent;


	// Use this for initialization
	void Start () {
		agent = GetComponent<NavMeshAgent>();
		target = GameObject.Find ("wayPoint2");
		agent.SetDestination(target.transform.position);

	}
	
	// Update is called once per frame
	void Update () {
		//agent.SetDestination(target.transform.position);

		if(agent.remainingDistance <= 1){
			//Debug.Log ("Real close.");
			if(target.name == "wayPoint1"){
				SwitchTarget(GameObject.Find("wayPoint2"));
			} else if(target.name == "wayPoint2") {
				SwitchTarget(GameObject.Find ("wayPoint1"));
			}
		}

	}

	void SwitchTarget (GameObject newTarget) {
		//Debug.Log ("Switching target.");
		target = newTarget;
		agent.SetDestination(target.transform.position);

	}
}
