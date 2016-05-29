TopMembershipcrimeID1=rand(10,1);	
TopMembershipcrimeID2=rand(10,1);	
TopMembershipcrimeID3=rand(10,1);	
TopMembershipcrimeID4=rand(10,1);	
TopMembershipcrimeID5=rand(10,1);	
TopMembershipcrimeID6=rand(10,1);	
TopMembershipcrimeID7=rand(10,1);	
TopMembershipcrimeID8=rand(10,1);	
TopMembershipcrimeID9=rand(10,1);	
TopMembershipcrimeID10=rand(10,1);	

it0_crime = [TopMembershipcrimeID1; TopMembershipcrimeID2; TopMembershipcrimeID3; TopMembershipcrimeID4; TopMembershipcrimeID5; TopMembershipcrimeID6; TopMembershipcrimeID7; TopMembershipcrimeID8; TopMembershipcrimeID9; TopMembershipcrimeID10 ]

TopMembershipeconomyID1=rand(10,1);	
TopMembershipeconomyID2=rand(10,1);	
TopMembershipeconomyID3=rand(10,1);	
TopMembershipeconomyID4=rand(10,1);	
TopMembershipeconomyID5=rand(10,1);	
TopMembershipeconomyID6=rand(10,1);	
TopMembershipeconomyID7=rand(10,1);	
TopMembershipeconomyID8=rand(10,1);	
TopMembershipeconomyID9=rand(10,1);	
TopMembershipeconomyID10=rand(10,1);	
it0_economy = [TopMembershipeconomyID1; TopMembershipeconomyID2; TopMembershipeconomyID3; TopMembershipeconomyID4; TopMembershipeconomyID5; TopMembershipeconomyID6; TopMembershipeconomyID7; TopMembershipeconomyID8; TopMembershipeconomyID9; TopMembershipeconomyID10 ]

TopMembershipeducationID1=rand(10,1);	
TopMembershipeducationID2=rand(10,1);	
TopMembershipeducationID3=rand(10,1);	
TopMembershipeducationID4=rand(10,1);	
TopMembershipeducationID5=rand(10,1);	
TopMembershipeducationID6=rand(10,1);	
TopMembershipeducationID7=rand(10,1);	
TopMembershipeducationID8=rand(10,1);	
TopMembershipeducationID9=rand(10,1);	
TopMembershipeducationID10=rand(10,1);	
it0_education = [TopMembershipeducationID1; TopMembershipeducationID2; TopMembershipeducationID3; TopMembershipeducationID4; TopMembershipeducationID5; TopMembershipeducationID6; TopMembershipeducationID7; TopMembershipeducationID8; TopMembershipeducationID9; TopMembershipeducationID10 ]

TopMembershipsportsID1=rand(10,1);	
TopMembershipsportsID2=rand(10,1);	
TopMembershipsportsID3=rand(10,1);	
TopMembershipsportsID4=rand(10,1);	
TopMembershipsportsID5=rand(10,1);	
TopMembershipsportsID6=rand(10,1);	
TopMembershipsportsID7=rand(10,1);	
TopMembershipsportsID8=rand(10,1);	
TopMembershipsportsID9=rand(10,1);	
TopMembershipsportsID10=rand(10,1);	
it0_sports = [TopMembershipsportsID1; TopMembershipsportsID2; TopMembershipsportsID3; TopMembershipsportsID4; TopMembershipsportsID5; TopMembershipsportsID6; TopMembershipsportsID7; TopMembershipsportsID8; TopMembershipsportsID9; TopMembershipsportsID10 ]

TopMembershipcrimeID1=rand(10,1);	
TopMembershipcrimeID2=rand(10,1);	
TopMembershipcrimeID3=rand(10,1);	
TopMembershipcrimeID4=rand(10,1);	
TopMembershipcrimeID5=rand(10,1);	
TopMembershipcrimeID6=rand(10,1);	
TopMembershipcrimeID7=rand(10,1);	
TopMembershipcrimeID8=rand(10,1);	
TopMembershipcrimeID9=rand(10,1);	
TopMembershipcrimeID10=rand(10,1);	
it0_online = [TopMembershiponlineID1; TopMembershiponlineID2; TopMembershiponlineID3; TopMembershiponlineID4; TopMembershiponlineID5; TopMembershiponlineID6; TopMembershiponlineID7; TopMembershiponlineID8; TopMembershiponlineID9; TopMembershiponlineID10 ]

save('it0.mat', 'it0_crime', 'it0_economy', 'it0_education', 'it0_sports', 'it0_online')