import { defineStore } from 'pinia';
import appConf from '@/api/conf/app.conf.ts';
import ApiResponseDto from '@/api/dto/api-response.dto.ts';

const useChangeProjectSharingSettingsStore = defineStore(
  'changeProjectShareSettingsStore',
  {
    state: () => ({
      showModal: false,
      projectId: 0,
      collaboration: false,
      marketplace: false,
      collaborationLink: '',
      needFetchIfUpdate: false, //Are we need to fetch collaboration link if collaboration updates (we need if it changes from false to true)
    }),
    getters: {
      getCollaborationData: (state: any) => state.collaboration,
      getMarketplaceData: (state: any) => state.marketplace,
      getCollaborationLink: (state: any) => state.collaborationLink,
    },
    actions: {
      async fetchCollabLink(id) {
        const ProjectModel = await import(
          '@/api/modules/project/models/project.model.ts'
        );
        const sharedToken =
          await ProjectModel.default.getCollaborationToken(id);
        if (sharedToken.success) {
          this.collaborationLink = `${appConf.proto}://${appConf.host}/project/${sharedToken.getData().access_token}/edit`;
        } else {
          this.collaborationLink = '';
        }
        return sharedToken;
      },
      loadData(data) {
        this.projectId = data.id;
        this.collaboration = data.shared;
        this.marketplace = data.shared_marketplace;
        this.needFetchIfUpdate = !data.shared;
      },
      async openModal(data: {
        id: number;
        shared_marketplace: boolean;
        shared: boolean;
      }) {
        this.projectId = data.id;
        this.collaboration = data.shared;
        this.marketplace = data.shared_marketplace;
        this.needFetchIfUpdate = !data.shared;
        if (data.shared) {
          const fetchRes = await this.fetchCollabLink(data.id);
          if (!fetchRes.success) return fetchRes;
        }
        this.showModal = true;
        // We need the ApiResponse instance here to identical result processing on the call-side
        return new ApiResponseDto(true, {});
      },
      async update(updateData) {
        this.collaboration = updateData.collaboration;
        this.marketplace = updateData.marketplace;

        const ProjectModel = await import(
          '@/api/modules/project/models/project.model.ts'
        );

        const patchResult = await ProjectModel.default.patchShare(
          this.projectId,
          updateData,
        );

        if (!patchResult.success) return patchResult;

        if (this.needFetchIfUpdate && this.collaboration) {
          const fetchRes = await this.fetchCollabLink(this.projectId);

          if (!fetchRes.success) return fetchRes;

          this.needFetchIfUpdate = false;
        }

        if (!this.collaboration) {
          this.collaborationLink = ``;
          this.needFetchIfUpdate = true;
        }

        return patchResult;
      },
      closeModal() {
        this.showModal = false;
      },
    },
  },
);

export default useChangeProjectSharingSettingsStore;
