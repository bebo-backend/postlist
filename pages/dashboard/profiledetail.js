import { useState } from 'react'

import useSWR from 'swr'
import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {ViewMessage} from "../../components/navigation/header"
import {More} from '../../components/pagination'

import {CloudinaryUpload} from "../../components/submitform"
import {CLOUDINARY_URL} from "../../components/contrib/config"


const ProfilePage = ()=>{

return <div>
Page working
</div>

}





export const ProfileDetail = ({email,edit=true,callback}) => {
 
    const {data:account,mutate:mutateAccount} = useSWR(()=>'/api/dashboard/account/'+email,axios)

  const [image,setImage]   = useState("")

  const [errorMsg, setErrorMsg] = useState({})
const [submit, setSubmit] = useState(false)


if (account && callback){

	callback(account.data.user)
}

 const setImageId = async (value)=>{

setImage(value)


}

const removeImageId = async (value)=>{

setImage('')
}



const submitFormUpload= async (value)=>{

	
	setErrorMsg("")

	
  
   await axios.post("/api/dashboard/pic_update/", {image_id:value,email}).then(res => {
					
  
  if(res.data){
	setSubmit(true)
	mutateAccount()
  }


	  if (res.data.error) {
  
  		  setErrorMsg(res.data.error)
		
		} 

  
	
			}).then(err => {
				// setLoad(false)
				console.log("error - " + err)
	
			})
   
  
  }





    if (!account) {
        return (

            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 mb-30">
    <div className="pd-20 card-box height-100-p">

    <img src="/vendors/images/new-loader.gif" alt=""  width='60' />
    <i> Getting information...</i>
    <div className="profile-info">
            <h5 className="mb-20 h5 text-blue">Contact Information</h5>
            </div>
    </div>
    </div>

        )
    } else {


  return (




    <div className="pd-20 card-box height-100-p ProfileDetail">
        <div className="profile-photo">
            {edit && <a href="modal" data-toggle="modal" data-target="#modal" className="edit-avatar">
                <i className="fa fa-pencil"></i></a>}
            
           
                  {account.data.user && account.data.user.image ?
                   <img src={CLOUDINARY_URL+"w_230,h_230,g_face,r_max,c_thumb/"+account.data.user.image.image_id}  className="avatar-img " />
                   : <img src="/vendors/images/img2.jpg" alt="" style={{height:'150px'}} className="avatar-photo" />
                  }
                 
                 
                
        
        </div>


        
		<div className="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
									<div className="modal-dialog modal-dialog-centered" role="document">
										<div className="modal-content">
										<div className="modal-header pd-5">
<h6 className="p-4 text-uppercase">
													Picture upload / update
												</h6>
										</div>
											<div className="modal-body pd-2">
												
												<CloudinaryUpload title={account.data && account.data.user && account.data.user.fullname} multiple={false} maxLength={1} finishUpload={submitFormUpload} />
<div>
{submit &&  <div className="alert w-100 alert-success" role="alert"> Picture upload successfully </div> }
</div>

											</div>
											<div className="modal-footer">
												
												<button type="button" className="btn btn-primary" data-dismiss="modal" onClick={e=>setSubmit(false)}>Done</button>
											</div>
										</div>
									</div>
								</div>


        <h5 className="text-center h5 mb-0 my-2">{account.data && account.data.user && account.data.user.fullname}</h5>
        <p className="text-center text-muted font-14">Welcome back...</p>

        <div className="profile-info">
            <h5 className="mb-20 h5 text-blue">Contact Information</h5>
            <ul>
                
                <li>
                    <span>Email Address:</span>
					<i className="dw dw-email-1"></i>   {account.data.user && account.data.user.email}
                </li>
                <li>
                    <span>Phone Number:</span>
                    {account.data.user && account.data.user.phone}
                </li>
				<li>
                    <span>Whatsapp Number:</span>
                    {account.data.user && account.data.user.whatsappNo?  account.data.user.whatsappNo :"Update your Whatsapp No"}
                </li>
				<li>
                    <span>Address:</span>
               <i className="dw dw-pin"></i>     {account.data.user && account.data.user.address?  account.data.user.address :"Update your Address information"}
                </li>
                <li>
                    <span>Upload product:</span>
                    {account.data && account.data.property} product
                </li>

                      <li>
                    <span>About:</span>
                 <pre className="text-muted " style={{fontSize:'13px'}}>
									<p className=" text-wrap" style={{lineHeight:'20px'}}>
										{account.data.user && account.data.user.about}
										</p>
										</pre>
                </li>
          
            </ul>
        </div>
        <div className="profile-social">
            <h5 className="mb-20 h5 text-blue">Social Links</h5>
           {account.data.user &&   <ul className="clearfix">
           
                <li><a href={'/'+account.data.user.facebook_url} className="btn" data-bgcolor="#3b5998" data-color="#ffffff"><i className="fa fa-facebook"></i></a></li>
                <li><a href={'/'+account.data.user.twitter_url}className="btn" data-bgcolor="#1da1f2" data-color="#ffffff"><i className="fa fa-twitter"></i></a></li>
                <li><a href={'/'+account.data.user.linkedin_url} className="btn" data-bgcolor="#007bb5" data-color="#ffffff"><i className="fa fa-linkedin"></i></a></li>
                <li><a href={'/'+account.data.user.instagram_url} className="btn" data-bgcolor="#f46f30" data-color="#ffffff"><i className="fa fa-instagram"></i></a></li>

            </ul> }
        </div>
      
    </div>








  )

}
}







export const ProfileProperty = ({email,user}) => {
 
  const [propertyPage,setPropertyPage] = useState(1)

    const {data:property,mutate:mutateProperty} = useSWR(()=>'/api/dashboard/property/'+email+'/?page='+propertyPage,axios)
	const {data:account,mutate:mutateAccount} = useSWR(()=>'/api/dashboard/account/'+email,axios)

 const [page,setPage] = useState(1)


  
const loadNext=()=> setPage(property.data.property.nextPage)
const loadPrev=()=> setPage(property.data.property.prevPage)

const loadNextProperty=()=> setPropertyPage(property.data.property.nextPage)
const loadPrevProperty=()=> setPropertyPage(property.data.property.prevPage ? property.data.property.prevPage:1)



	const {data:messages,mutate:mutateMessages} = useSWR(()=>'/api/getMessages/'+email+'/?page='+page,axios)


	const [form, setForm] = useState({});
	const [load, setLoad] = useState(false);

	const change = (e)=>{
		
		const data = {
			...form,
			[e.target.name]:e.target.value
		}

		setForm(data)
	}

	const submit= async (e)=>{

e.preventDefault()
		setLoad(true)
	
	

	  
	   await axios.post("/api/dashboard/update/", {...form,
	email}).then(res => {
						
	  
	
	
	  if(res.data){
		setLoad(false)
		mutateAccount()

		
	  }

	})



	}

    if (!property) {
        return (

            <div className="col-12 mb-30">
    <div className="pd-20 card-box height-100-p ">

    <img src="/vendors/images/new-loader.gif" alt="" width='60' />
    
    <div className="profile-info">
            <h5 className="mb-20 h5 text-blue">Getting Properties ...</h5>
            </div>
    </div>
    </div>

        )
    }

if (property.data){


  return (

	
	<div className="card-box height-100-p overflow-hidden ProfileProperty">
	<div className="profile-tab height-100-p">
	  <div className="tab height-100-p profile">

	  <ul className="nav nav-tabs customtab" role="tablist">
	  <li className="nav-item">
		  <a className="nav-link py-2 px-1 active text-center" data-toggle="tab" href="#messages" role="tab">
		  <i className="icon-copy dw dw-message mx-2"></i>Messages</a>
	  </li>


	  <li className="nav-item">
		  <a className="nav-link py-2 px-1 text-center" data-toggle="tab" href="#timeline" 
		  role="tab"><i className="icon-copy dw dw-property mx-2"></i>
		  My Items</a>
	  </li>

	  <li className="nav-item">
		  <a className="nav-link py-2 px-1 text-center" data-toggle="tab" href="#setting" role="tab">
		  <i className="icon-copy dw dw-settings mx-2"></i>Settings</a>
	  </li>
  </ul>

 
  <div className="tab-content">


  <div className="tab-pane fade show active  custom-scroll" id="messages" role="tabpanel">
											<div className="pd-20">
												<div className="profile-timeline px-0">
												
     <ViewMessage messages={messages} loadNext={loadNext} loadPrev={loadPrev} />

												</div>
											</div>
										</div>


<div className="tab-pane fade show  custom-scroll" id="timeline" role="tabpanel">
											<div className="pd-20">
												<div className="profile-timeline px-0">
												
<PropertyTable property={'property' in property.data  && property.data.property.docs} 
loadNext={loadNextProperty} 
loadPrev={loadPrevProperty} mutateProperty={mutateProperty} 
hasNextPage={'property' in property.data  && property.data.property.hasNextPage} 
hasPrevPage={'property' in property.data  && property.data.property.hasPrevPage}/>

												</div>
											</div>
										</div>

	<div className="tab-pane fade height-100-p" id="setting" role="tabpanel">
											<div className="profile-setting">
												<form>
													<ul className="profile-edit-list row">
														<li className="weight-500 col-md-6">
															<h4 className="text-blue h5 mb-20">Edit Your Personal Setting</h4>
															<div className="form-group">
																<label>Full Name </label>
																<input name="fullname" className="form-control form-control-lg" onChange={change} placeholder={'user' in property.data && property.data.user && property.data.user.fullname} type="text"/>
															</div>
															
															<div className="form-group">
																<label>Whatsapp No:</label>
																<input name="whatsappNo" className="form-control form-control-lg" onChange={change} placeholder={'user' in property.data && property.data.user &&   property.data.user.whatsappNo} type="number"/>
															</div>
													
														
														
															<div className="form-group">
																<label>Phone Number</label>
																<input name="phone" className="form-control form-control-lg" onChange={change} placeholder={'user' in property.data && property.data.user && property.data.user.phone} type="text"/>
															</div>
															<div className="form-group">
																<label>Address</label>
																<textarea name="address" onChange={change} className="form-control" placeholder={'user' in property.data && property.data.user && property.data.user.address}></textarea>
															</div>

																<div className="form-group">
																<label>About</label>
																<textarea name="about" onChange={change} className="form-control" placeholder={'user' in property.data && property.data.user && property.data.user.about ? property.data.user.about:"Give a description on your bussiness or account"}></textarea>
															</div>
														
															<div className="form-group mb-0">
																<input type="submit" className="btn btn-primary" onClick={submit} value="Update Information"/>
																{load &&	
											 <span className="spinner-grow spinner-grow-sm mx-4" role="status" >
												 </span>}
												 	</div>
														</li>


														<li className="weight-500 col-md-6">
															<h4 className="text-blue h5 mb-20">Edit Social Media links</h4>
															<div className="form-group">
																<label>Facebook URL:</label>
																<input name="facebook_url" className="form-control form-control-lg" onChange={change} type="text" placeholder={'user' in property.data && property.data.user && property.data.user.facebook_url ? property.data.user.facebook_url: "Paste your link here"} />
															</div>
															<div className="form-group">
																<label>Twitter URL:</label>
																<input name="twitter_url" className="form-control form-control-lg" onChange={change} type="text" placeholder={'user' in property.data && property.data.user && property.data.user.twitter_url ? property.data.user.twitter_url: "Paste your link here"}/>
															</div>
															<div className="form-group">
																<label>Linkedin URL:</label>
																<input  name="linkedin_url" className="form-control form-control-lg" onChange={change} type="text" placeholder={'user' in property.data && property.data.user && property.data.user.linkedin_url ? property.data.user.linkedin_url: "Paste your link here"}/>
															</div>
															<div className="form-group">
																<label>Instagram URL:</label>
																<input name="instagram_url" className="form-control form-control-lg" onChange={change} type="text" placeholder={'user' in property.data && property.data.user && property.data.user.instagram_url ? property.data.user.instagram_url: "Paste your link here"}/>
															</div>
															
															<div className="form-group mb-0">
																<input type="submit" className="btn btn-primary" onClick={submit} value="Save & Update"/>
																{load &&	
											 <span className="spinner-grow spinner-grow-sm mx-4" role="status" >
												 </span>}
															</div>
														</li>
													</ul>
												</form>
											</div>
										</div>
										</div>
										</div>
										</div>
										</div>
  )
} else {

	<div>
		<i className="fe fe-32 fe-clear">No available Property</i>
	</div>
}
}




export const PropertyTable = ({property=[],mutateProperty=f=>f,loadNext,loadPrev,hasNextPage,hasPrevPage}) => {

const router = useRouter()


const propertyAction = async (action,title,id)=>{


switch (action){

case "delete":{


await axios.get('/api/propertyAction/delete/'+id).then(result=>{


mutateProperty()
})


	break;
}

case "view":{

	router.push("/details/"+title+'/'+id);
	break;
}

case "edit":{

	;

	break;
}

default :{

console.log("No action specified");
break;

}

}







}




return (

	<div className="pb-20">

<table className="data-table table stripe hover nowrap">
							<thead>
								<tr>
									<th className="table-plus datatable-nosort">Image</th>
									<th>Title</th>
									<th>Address</th>
									<th>(N) Price</th>
									<th>Date</th>
									<th className="datatable-nosort">Action</th>
								</tr>
							</thead>
<tbody> 

{property && Object.values(property).map((value,key)=>	<tr className={key}>
									<td className="table-plus">
										{value.images.length > 0 ?
											 <img src={CLOUDINARY_URL+"w_70,h_70,f_auto/"+value.images[0].image_id}  alt={'image'} className="avatar-img rounded" />
                  
                   : <img src="/vendors/images/no-image.jpg" width="75" height='70' alt="..." className="avatar-img rounded" />}
									</td>
<td>{value.title}</td>
								{'location' in value ?	<td>{value.location.street}, {value.location.city} , { value.location.state}</td> : <td>None</td>}
<td>{value.price}.0  {'duration' in value && <span>  {value.duration && <span>/ {value.duration} </span>} </span>}</td>
<td>{value.date ? value.date.split("T")[0] : "No date"}</td>
									<td>
										<div className="dropdown">
											<a className="btn btn-link font-24 p-0 line-height-1 no-arrow dropdown-toggle" href="#" role="button" data-toggle="dropdown">
												<i className="dw dw-more"></i>
											</a>
											<div className="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
												<a className="dropdown-item" href="#" onClick={e=>propertyAction('view',value.title,value._id)}><i className="dw dw-eye"  ></i> View</a>
												<a className="dropdown-item" href="#" disabled onClick={e=>propertyAction('edit',value.title,value._id)}><i className="dw dw-edit2"></i> Edit</a>
												<a className="dropdown-item" href="#" onClick={e=>propertyAction('delete',value.title,value._id)}><i className="dw dw-delete-3"></i> Delete</a>
											</div>
										</div>
									</td>
								</tr>)}

</tbody>
<tfoot>



</tfoot>
							</table>


							 <More 
               hasNext={hasNextPage} 
                hasPrev={hasPrevPage} next={loadNext} prev={loadPrev} />
              


		</div>
)

}



export default ProfilePage