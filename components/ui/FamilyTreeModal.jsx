import { useEffect, useRef, useMemo } from "react";
import Modal from "./modal";
import FamilyTree, { match } from "@balkangraph/familytree.js";

export default function FamilyTreeModal({ isOpen, onClose, pets }) {
  const treeRef = useRef();

  const petNodes = useMemo(() => {
    if (!pets || pets.length === 0) return [];

    // Chuẩn hóa dữ liệu
    const petMap = new Map(
      pets.map((pet) => [
        pet.code,
        {
          ...pet,
          fid: pet.father || undefined,
          mid: pet.mother || undefined,
          pids: [], // đảm bảo pids là array
        },
      ])
    );

    const visited = new Set();
    const nodes = [];

    const collectAncestors = (code, depth = 0) => {
      if (!code || visited.has(code)) return;
      visited.add(code);

      const pet = petMap.get(code);
      if (!pet) return;
      const genderRaw = pet.gender?.toLowerCase();
      const genderDisplay =
        genderRaw === "male" ? "Đực" : genderRaw === "female" ? "Cái" : "";
      const tag =
        genderRaw === "male"
          ? "male"
          : genderRaw === "female"
          ? "female"
          : "extra";
  
  

      const node = {
        id: pet.code,
        name: pet.name,
        img: pet.image || "https://cdn-icons-png.flaticon.com/512/25/25694.png",
        birthDate: pet.birthDate?.split("T")[0],
        color: pet.color,
        weight: pet.weight,
        nationality: pet.nationality,
        certificate: pet.certificate,
        note: pet.note,
        tags: [tag],
        gender:genderDisplay,
        fid: pet.fid,
        mid: pet.mid,
        pids: pet.pids?.length ? [...pet.pids] : undefined,
      };

      // ✅ Gán pids 2 chiều giữa cha mẹ
      if (pet.fid && pet.mid) {
        const father = petMap.get(pet.fid);
        const mother = petMap.get(pet.mid);

        if (father) {
          if (!Array.isArray(father.pids)) father.pids = [];
          if (!father.pids.includes(pet.mid)) father.pids.push(pet.mid);
        }

        if (mother) {
          if (!Array.isArray(mother.pids)) mother.pids = [];
          if (!mother.pids.includes(pet.fid)) mother.pids.push(pet.fid);
        }
      }

      nodes.push(node);

      // Đệ quy tiếp tục lên ông bà
      if (pet.fid) collectAncestors(pet.fid, depth + 1);
      if (pet.mid) collectAncestors(pet.mid, depth + 1);
    };

    // Bắt đầu từ chó con đầu tiên
    const rootPet = pets[0];
    if (rootPet) {
      collectAncestors(rootPet.code, 0);
    }
    
  
    // ✅ Thêm các node còn lại (cha mẹ chưa được vẽ nhưng có pids)
    for (const pet of petMap.values()) {
      if (!visited.has(pet.code)) {
        const genderRaw = pet.gender?.toLowerCase();
        const genderDisplay =
          genderRaw === "male" ? "Đực" : genderRaw === "female" ? "Cái" : "";
        const tag =
          genderRaw === "male"
            ? "male"
            : genderRaw === "female"
            ? "female"
            : "extra";

        nodes.push({
          id: pet.code,
          name: pet.name,
          img:
            pet.image || "https://cdn-icons-png.flaticon.com/512/25/25694.png",
          birthDate: pet.birthDate?.split("T")[0],
          color: pet.color,
          weight: pet.weight,
          nationality: pet.nationality,
          certificate: pet.certificate,
          note: pet.note,
          tags: [tag],
          gender: genderDisplay,
          fid: pet.fid,
          mid: pet.mid,
          pids: pet.pids?.length ? [...pet.pids] : undefined,
        });
      }
    }

    return nodes;
  }, [pets]);
  

  useEffect(() => {
    if (isOpen && typeof window !== "undefined") {
        requestAnimationFrame(() => {
            FamilyTree.templates.bully = Object.assign(
              {},
              FamilyTree.templates.base,
              {
                size: [220, 350], // đủ chiều cao chứa ảnh + text

                // Khung tổng thể node
                node: '<rect x="0" y="0" width="220" height="210" rx="12" ry="12" fill="{color}" stroke="#FFD700" stroke-width="3"></rect>',

                // Ảnh hình chữ nhật, chiếm full chiều ngang
                img_0:
                  '<clipPath id="{randId}"><rect x="0" y="0" width="220" height="120" rx="10" ry="10"></rect></clipPath>' +
                  '<image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="0" y="0" height="120" width="220"></image>',

                // Text dưới ảnh, căn giữa
                field_0:
                  '<text style="font-size: 16px; font-weight: bold;" fill="#fff" x="110" y="135" text-anchor="middle">{val}</text>',
                field_1:
                  '<text style="font-size: 12px;" fill="#ccc" x="110" y="150" text-anchor="middle">Ngày sinh: {val}</text>',
                field_2:
                  '<text style="font-size: 12px;" fill="#ccc" x="110" y="165" text-anchor="middle">Màu: {val}</text>',
                field_3:
                  '<text style="font-size: 12px;" fill="#ccc" x="110" y="180" text-anchor="middle">Cân nặng: {val}</text>',
                field_4:
                  '<text style="font-size: 12px;" fill="#ccc" x="110" y="195" text-anchor="middle">Quốc tịch: {val}</text>',
                field_5:
                  '<text style="font-size: 12px;" fill="#ccc" x="110" y="210" text-anchor="middle">Chứng nhận: {val}</text>',
                field_6:
                  '<text style="font-size: 12px;" fill="#ccc" x="110" y="215" text-anchor="middle">Giới tính: {val}</text>',
              }
            );
              
              
            FamilyTree.templates.bully_male = Object.assign(
              {},
              FamilyTree.templates.base,
              {
                size: [220, 270],
                node: '<rect x="0" y="0" width="220" height="270" rx="12" ry="12" fill="#111827" stroke="#3B82F6" stroke-width="3"></rect>',
                img_0:
                  '<clipPath id="{randId}"><rect x="0" y="0" width="220" height="120" rx="10" ry="10"></rect></clipPath>' +
                  '<image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="0" y="0" height="120" width="220"></image>',
                field_0:
                  '<text style="font-size: 16px; font-weight: bold;" fill="#fff" x="110" y="140" text-anchor="middle">{val}</text>',
                field_1:
                  '<text style="font-size: 12px;" fill="#ccc" x="110" y="155" text-anchor="middle">Ngày sinh: {val}</text>',
                field_2:
                  '<text style="font-size: 12px;" fill="#ccc" x="110" y="170" text-anchor="middle">Màu: {val}</text>',
                field_3:
                  '<text style="font-size: 12px;" fill="#ccc" x="110" y="185" text-anchor="middle">Cân nặng: {val}</text>',
                field_4:
                  '<text style="font-size: 12px;" fill="#ccc" x="110" y="200" text-anchor="middle">Quốc tịch: {val}</text>',
                field_5:
                  '<text style="font-size: 12px;" fill="#ccc" x="110" y="215" text-anchor="middle">Chứng nhận: {val}</text>',
                field_6:
                  '<text style="font-size: 12px;" fill="#ccc" x="110" y="230" text-anchor="middle">Giới tính: {val}</text>',
              }
            );
            FamilyTree.templates.bully_female = Object.assign(
              {},
              FamilyTree.templates.bully_male,
              {
                node: '<rect x="0" y="0" width="220" height="270" rx="12" ry="12" fill="#111827" stroke="#F472B6" stroke-width="3"></rect>',
              }
            );
          let chart = new FamilyTree(treeRef.current, {
            template: "bully",
            mode: "dark",
            lazyLoading: true,
            enableSearch: false,
            nodeMenu: null,
            nodeMouseClick: FamilyTree.action.none,

            // enablePan: false,testzzzzzz
            scaleInitial: FamilyTree.match.boundary,
            rootId: pets[0]?.code,
            nodeBinding: {
              field_0: "name",
              img_0: "img",
              field_1: "birthDate",
              field_2: "color",
              field_3: "weight",
              field_4: "nationality",
              field_5: "certificate",
              field_6: "gender",
            },
            editForm: {
              buttons: {
                edit: null,
                share: null,
                pdf: null,
              },
              enabled: false,
              generateElementsFromFields: false,
              elements: [
                { type: "textbox", label: "Tên", binding: "name" },
                [{ type: "date", label: "Birth Date", binding: "dob" }],
                { type: "textbox", label: "Màu", binding: "color" },
                { type: "textbox", label: "Cân nặng", binding: "weight" },
                // { type: "textbox", label: "Hình ảnh", binding: "img" },
                { type: "textbox", label: "Quốc Tịch", binding: "nationality" },
                {
                  type: "textbox",
                  label: "Chứng nhận",
                  binding: "certificate",
                },
                {
                  type: "textbox",
                  label: "Giới tính",
                  binding: "gender",
                },
              ],
            },
            template: "bully",
            tags: {
              male: { template: "bully_male" },
              female: { template: "bully_female" },
            },
            nodes: petNodes,
          });
          chart.load(petNodes, () => {
            chart.expandCollapse(
              null,
              petNodes.map((p) => p.id),
              [],
              () => {
                chart.fit();
              }
            );
          });
        });
    }

  }, [isOpen, petNodes]);

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div id="tree" ref={treeRef} className="w-full h-[80vh]"></div>
    </Modal>
  );
}
