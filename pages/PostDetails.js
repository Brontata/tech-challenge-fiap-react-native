import React from 'react';
import PostDetailsView from '../components/PostDetailsView';
import getToken from '../services/GetToken';
import { getRoleFromToken } from '../utils/tokenUtils';
import { useAuth } from '../Hooks/useAuth';

const PostDetails = ({ route, navigation }) => {
    const { post } = route.params;
    const { role } = useAuth();
    const isAdmin = role == "PROFESSOR"
    
    return (
        <PostDetailsView navigation={navigation} route={route} post={post} admin={isAdmin} />
    );
}

export default PostDetails;

